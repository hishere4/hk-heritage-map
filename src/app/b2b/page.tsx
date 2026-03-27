import B2BForm from './B2BForm';

export const dynamic = 'force-dynamic';

export default function B2BPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1>企業 & 學校專區</h1>
      <B2BForm />
    </div>
  );
}
