import { GetFormStats, GetForms } from "@/actions/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/custom/CreateFormButton";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

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

const StatsCard = ({
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

const FormCardSkeleton = () => {
  return (
    <Skeleton className="border-2 border-primary-/20 h-[190px] w-full"></Skeleton>
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

const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card className="h-[190px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No Description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full m-3 text-sm gap-4">
            <Link href={`/forms/${form.id}`}>
              View Submissions <BiRightArrowAlt />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button
            variant={"secondary"}
            asChild
            className="w-full m-3 text-sm gap-4 rounded"
          >
            <Link href={`/builder/${form.id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
