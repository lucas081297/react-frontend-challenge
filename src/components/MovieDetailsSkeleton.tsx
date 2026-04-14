import { Skeleton } from '#/components/ui/skeleton.tsx'

export function MovieDetailsSkeleton() {
  return (
    <>
      <div className="relative aspect-video w-full">
        <Skeleton className="w-full h-full" />
      </div>

      <main className="my-8 px-10 flex flex-row gap-8 justify-between">
        <section className="flex flex-col w-[65%] gap-10">
          <div className="flex flex-row gap-7 items-start py-3 px-2 rounded-2xl bg-surface-variant/20">
            <div className="flex flex-col text-nowrap">
              <span className="text-xs uppercase text-amber-600">
                Classificação
              </span>
              <Skeleton className="h-6 w-12 mt-1" />
            </div>

            <div className="flex flex-col text-nowrap">
              <span className="text-xs uppercase text-amber-600"></span>
              <Skeleton className="h-6 w-16 mt-1" />
            </div>

            <div className="flex flex-col">
              <span className="text-xs uppercase text-amber-600"></span>
              <div className="flex flex-wrap gap-1 mt-1">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-9 w-32" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-9 w-24" />
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col gap-2 min-w-50">
                  <Skeleton className="aspect-2/3 w-full rounded-lg" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-[30%]">
          <div className="relative pt-5">
            <div className="flex flex-col gap-4 rounded-2xl p-4 mt-4 text-sm bg-surface-variant/80">
              <Skeleton className="h-5 w-32" />

              <div className="flex flex-row gap-2 text-xs">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>

              <div className="flex flex-row gap-2 text-xs">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>

              <div className="flex flex-row gap-2 text-xs">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="absolute top-0 right-0 flex justify-end pe-2">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
