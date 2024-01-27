import { GetFormStats } from "@/actions/form";
import CreateFormButton from "@/components/custom/CreateFormButton";
import { FormCard } from "@/components/custom/FormCard";
import { GetForms } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { LuView } from "react-icons/lu";
import { TbArrowBounce } from "react-icons/tb";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrappers />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4, 5].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

const CardStatsWrappers = async () => {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
};

type StatsCardsProps = {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
};

const StatsCards = (props: StatsCardsProps) => {
  const { data, loading } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Visits"
        helperText="All time form visits"
        loading={loading}
        className="shadow-md shadow-blue-600"
        value={data?.visits.toLocaleString() || ""}
        icon={<LuView className="text-blue-600" />}
      />
      <StatsCard
        title="Total Submissions"
        helperText="All time form submissions"
        loading={loading}
        className="shadow-md shadow-yellow-600"
        value={data?.submissions.toLocaleString() || ""}
        icon={<FaWpforms className="text-yellow-600" />}
      />
      <StatsCard
        title="Submission Rate"
        helperText="Visits that result in form submission"
        loading={loading}
        className="shadow-md shadow-green-600"
        value={data?.submissionRate.toLocaleString() || ""}
        icon={<HiCursorClick className="text-green-600" />}
      />
      <StatsCard
        title="Bounce Rate"
        helperText="Visits that leave w/o interacting"
        loading={loading}
        className="shadow-md shadow-red-600"
        value={data?.bounceRate.toLocaleString() || ""}
        icon={<TbArrowBounce className="text-red-600" />}
      />
    </div>
  );
};

export const StatsCard = ({
  title,
  value,
  icon,
  loading,
  helperText,
  className,
}: {
  title: string;
  value: string;
  icon: ReactNode;
  loading: boolean;
  helperText: string;
  className: string;
}) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
};

const FormCards = async () => {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
};

const FormCardSkeleton = () => {
  return (
    <Skeleton className="border-2 border-primary-/20 h-[190px] w-full"></Skeleton>
  );
};
