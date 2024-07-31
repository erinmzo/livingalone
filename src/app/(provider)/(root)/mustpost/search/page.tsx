import Page from "@/components/common/Page/Page";
import SearchList from "@/components/mustpost/search/SearchList";

function MustListPage({ searchParams }: { searchParams: { search: string } }) {
  return (
    <Page>
      <SearchList searchValue={searchParams.search} />
    </Page>
  );
}

export default MustListPage;
