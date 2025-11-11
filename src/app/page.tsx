import { redirect } from 'next/navigation'

export default function Home() {
  // 홈페이지 접근 시 안내 페이지로 리다이렉트
  redirect('/invoice/guide')
}
