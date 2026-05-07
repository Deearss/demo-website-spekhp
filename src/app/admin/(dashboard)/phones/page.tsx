import { adminGetPhones } from "@/lib/admin-api";
import PhoneTable from "@/components/admin/PhoneTable";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPhonesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const cookieStore = await cookies();
  
  const urlBrand = resolvedParams.brand as string;
  const urlSort = resolvedParams.sort as string;
  const cookieBrand = cookieStore.get("admin-brand")?.value;
  const cookieSort = cookieStore.get("admin-sort")?.value;

  // 1. Logika Sticky URL: Kalo URL kosong tapi Cookies ada isinya, REDIRECT di server!
  // Ini biar URL sinkron sama Cookies tanpa nunggu client-side render (Anti-Flicker)
  if (!urlBrand && !urlSort && (cookieBrand || cookieSort)) {
    const params = new URLSearchParams();
    if (cookieBrand && cookieBrand !== "All") params.set("brand", cookieBrand);
    if (cookieSort && cookieSort !== "newest") params.set("sort", cookieSort);
    
    const queryString = params.toString();
    if (queryString) {
      redirect(`/admin/phones?${queryString}`);
    }
  }

  // 2. Ambil nilai final buat render (Prioritas URL)
  const brand = urlBrand || cookieBrand || "All";
  const sort = urlSort || cookieSort || "newest";

  const phones = await adminGetPhones();

  return (
    <div className="flex flex-col gap-6">
      <AdminBreadcrumb />
      <div>
        <h1 className="text-2xl font-bold text-text mb-1">Daftar HP</h1>
        <p className="text-text-3 text-sm">Kelola data smartphone di dalam database</p>
      </div>

      <PhoneTable 
        initialPhones={phones} 
        initialBrand={brand}
        initialSort={sort}
      />
    </div>
  );
}
