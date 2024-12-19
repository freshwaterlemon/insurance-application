import Addbutton from '@/components/add-buton';
import { getPoliciesPaged } from '../actions/getPoliciesPaged';
import { PoliciesTable } from '@/components/policies-table';

type SearchParams = Promise<{
	offset: string;
	[key: string]: string | string[] | undefined;
}>;

export default async function PoliciesPage(props: {
	searchParams: SearchParams;
}) {
	const searchParams = await props.searchParams;
	const offset = searchParams.offset ?? 0;
	const { policies, newOffset, totalPolicy } = await getPoliciesPaged(
		Number(offset),
		5
	);

	if (!policies || policies.length === 0) {
		return <div className="p-4 pt-3 space-y-4">
		<Addbutton
			buttonName={`Add Policy`}
			linkpath={`policies/add`}
		/>
		<div>No policies found.</div>
	</div>;
	}

	return (
		<>
			<div className="p-4 pt-3 space-y-4">
				<Addbutton
					buttonName={`Add Policy`}
					linkpath={`policies/add`}
				/>
				<PoliciesTable
					policies={policies}
					offset={newOffset}
					totalPolicy={totalPolicy}
				/>
			</div>
		</>
	);
}
