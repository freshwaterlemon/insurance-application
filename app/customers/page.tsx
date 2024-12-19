import Addbutton from '@/components/add-buton';
import { getCustomersPaged } from '../actions/getCustomersPaged';
import { CustomersTable } from '@/components/customers-table';
// import { unstable_cache } from "next/cache";

type SearchParams = {
	offset?: string;
	[key: string]: string | string[] | undefined;
};

export default async function CustomersPage(props: {
	searchParams: SearchParams;
}) {
	const searchParams = await props.searchParams;
	const offset = searchParams.offset ?? 0;
	// const getCachedPolices = unstable_cache(getCustomersPaged, ["all_policies", offset], { revalidate: 5 })
	// const { customers, newOffset, totalCustomer } = await getCachedPolices(Number(offset), 5);
	const { customers, newOffset, totalCustomer } = await getCustomersPaged(
		Number(offset),
		5
	);

	if (!customers || customers.length === 0) {
		return <div className="p-4 pt-3 space-y-4">
			<Addbutton
				buttonName={`Add Policy Holder`}
				linkpath={`customers/add`}
			/>
			<div>No policies holders found. Add new ones using the button above.</div>
		</div>;
	}

	return (
		<>
			<div className="p-4 pt-3 space-y-4">
				<Addbutton
					buttonName={`Add Policy Holder`}
					linkpath={`customers/add`}
				/>
				<CustomersTable
					customers={customers}
					offset={newOffset}
					totalCustomer={totalCustomer}
				/>
			</div>
		</>
	);
}
