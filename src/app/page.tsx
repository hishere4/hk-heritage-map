import { redirect } from 'next/navigation';

export default function HomePage() {
  // 重定向到香港地區頁面
  redirect('/hk');
}
