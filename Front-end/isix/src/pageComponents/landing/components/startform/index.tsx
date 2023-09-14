"use client"

import Link from 'next/link';

export default function StartForm() {
  return (
    <div style={{backgroundColor:'skyblue'}} className="tags">
      <div className="">
        <div className="">
          <p className="">유치원 | </p>
          <input type="text" />
        </div>
      </div>
      <div className="">
        <div className="">
          <p className="">반 이름 | </p>
          <input type="text" />
        </div>
      </div>
      <div className="">
        <div className="">
          <p className="">인원 수 | </p>
          <input type="number" max={6} min={1} step={1} onKeyDown={(e) => e.preventDefault()} onPaste={(e) => e.preventDefault()} />
        </div>
      </div>
      <div>
        <Link href='/main' prefetch={true} passHref> 
          시작하기
        </Link> 
      </div>
    </div>
  );
}