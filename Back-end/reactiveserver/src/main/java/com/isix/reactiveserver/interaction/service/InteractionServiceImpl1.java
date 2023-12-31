
package com.isix.reactiveserver.interaction.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.isix.reactiveserver.interaction.dto.InteractionDto;
import com.isix.reactiveserver.response.MultiOcrResponse;
import com.isix.reactiveserver.socket.handler.MultiSocketHandler;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

//@Service
@RequiredArgsConstructor
public class InteractionServiceImpl1 implements InteractionService {
    private final String apiURL = "https://pn1cviln5o.apigw.ntruss.com/custom/v1/25019/43cb75334f4b833fbad3ade5fea79ae61eb36111a883f491554027d696426ec9/general";
    private final String secretKey = "aFBtU09YS2JCQ09TVGJlaE1Qa2NLVlVZUGVyd2FxRFc=";

    private final MultiSocketHandler multiSocketHandler;


    @Override
    public InteractionDto.MotionResponse checkMotionOk(String sessionId, String eventName, int numChild, int limit) {
        return null;
    }

    @Override
    public MultiOcrResponse recogBoardAndOcr(String sessionId, int numChild) {
        //byte[] temp = multiSocketHandler.getByteMessage(sessionId);

//        String response = new String(temp);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.IMAGE_JPEG);
        // RestTemplate 인스턴스 생성
        RestTemplate restTemplate = new RestTemplate();

// GET 요청 수행
        ResponseEntity<byte[]> response = restTemplate.getForEntity("http://127.0.0.1:8000/review/api/review/", byte[].class);

        try {
            String resultText = ocrApiCall(response.getBody());

            // JSON 문자열을 파싱하는 ObjectMapper 생성
            ObjectMapper objectMapper = new ObjectMapper();

            // JSON 문자열을 JsonNode로 파싱
            JsonNode jsonNode = objectMapper.readTree(resultText);
            // JSON 내부에서 image 값을 확인하면서 필요한 값만 가져온다.
            JsonNode imagesNode = jsonNode.get("images");

            List<InteractionDto.OcrResponse> ocrDtoList = new ArrayList<>();
            if (imagesNode != null && imagesNode.isArray()) {
                for (JsonNode imageNode : imagesNode) {
                    // Extract the "fields" array
                    JsonNode fieldsNode = imageNode.get("fields");
                    if (fieldsNode != null && fieldsNode.isArray()) {
                        for (JsonNode field : fieldsNode) {
                            // Extract the values of "inferText" and "Vertical"
                            InteractionDto.OcrResponse ocrDto = new InteractionDto.OcrResponse();
                            String inferTextValue = field.get("inferText").asText().replaceAll(" ", "");
                            System.out.println("inferText = " + inferTextValue);
                            ocrDto.setInferText(inferTextValue);
                            JsonNode vertices = imageNode.get("fields").get(0).get("boundingPoly").get("vertices");
                            System.out.println("Vertices for Image:");
                            double[] xArray = new double[4];
                            double[] yArray = new double[4];
                            int idx = 0;
                            for (JsonNode vertex : vertices) {
                                double x = vertex.get("x").asDouble();
                                double y = vertex.get("y").asDouble();
                                xArray[idx] = x;
                                yArray[idx] = y;
                                idx++;
                                System.out.println("x: " + x + ", y: " + y);
                            }
                            ocrDto.setX(xArray);
                            ocrDto.setY(yArray);
                            ocrDtoList.add(ocrDto);
                        }
                    }
                }
            }
            return new MultiOcrResponse(numChild, ocrDtoList);
        }catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public InteractionDto.OxResponse checkOx(String sessionId, int numChild) {


        return null;
    }

    @Override
    public InteractionDto.SttResponse recognizeVoice(MultipartFile mp3File, String sessionId, String type) {
        return null;
    }

    private String ocrApiCall(byte[] temp){
        try {
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setUseCaches(false);
            con.setDoInput(true);
            con.setDoOutput(true);
            con.setReadTimeout(30000);
            con.setRequestMethod("POST");
            String boundary = "----" + UUID.randomUUID().toString().replaceAll("-", "");
            con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
            con.setRequestProperty("X-OCR-SECRET", secretKey);

            JSONObject json = new JSONObject();
            json.put("version", "V2");
            json.put("requestId", UUID.randomUUID().toString());
            json.put("timestamp", System.currentTimeMillis());
            JSONObject image = new JSONObject();
            image.put("format", "jpg");
            image.put("name", "demo");
            JSONArray images = new JSONArray();
            images.put(image);
            json.put("images", images);
            String postParams = json.toString();

            con.connect();
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            long start = System.currentTimeMillis();

// Pass the image data as a byte array instead of a File object
            writeMultiPart(wr, postParams, temp, "temp.jpg", boundary);
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            if (responseCode == 200) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

            System.out.println(response);

            return response.toString();
        } catch (Exception e) {
            System.out.println(e);
            return "요청 실패";
        }
    }

    private void writeMultiPart(OutputStream out, String jsonMessage, byte[] imageData, String imageName, String boundary) throws IOException {
        StringBuilder sb = new StringBuilder();
        sb.append("--").append(boundary).append("\r\n");
        sb.append("Content-Disposition:form-data; name=\"message\"\r\n\r\n");
        sb.append(jsonMessage);
        sb.append("\r\n");

        out.write(sb.toString().getBytes(StandardCharsets.UTF_8));
        out.flush();

        if (imageData != null && imageData.length > 0) {
            out.write(("--" + boundary + "\r\n").getBytes(StandardCharsets.UTF_8));
            StringBuilder fileString = new StringBuilder();
            fileString.append("Content-Disposition:form-data; name=\"file\"; filename=\"").append(imageName).append("\"\r\n");
            fileString.append("Content-Type: application/octet-stream\r\n\r\n");
            out.write(fileString.toString().getBytes(StandardCharsets.UTF_8));
            out.flush();

            // Write the image data
            out.write(imageData);
            out.write("\r\n".getBytes());

            out.write(("--" + boundary + "--\r\n").getBytes(StandardCharsets.UTF_8));
        }
        out.flush();
    }

}
