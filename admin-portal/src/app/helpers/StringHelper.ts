import { extractRoleFromTokenObject } from "@/utils";

export const getRole = (role: string) => {
    if (role == 'admin') return 'Admin'
    return 'Super Admin'
}

export const getActiveStatus = (status: boolean | number) => {
    return status ? 'Active' : 'Inactive';
}

export const isSuperAdmin = (role: string | null) => {
    if(!role) return null;
    return role === 'superadmin'
}

export const isLoggedUserSuperAdmin = () => {
    const role = extractRoleFromTokenObject();
    return isSuperAdmin(role);
}

export const getBankingType = (type: string) => {
    if (type === 'islamic') return 'Islamic'
    if (type === 'conventional') return 'Conventional'
    return type;
}

export const isApplicationIslamic = (type: string) => {
    if (type === 'islamic') return true

    return false
}
export const getApplicationStatus = (status: string) => {
	if(!status) return 'N/A';
    if (status === 'submitted') return 'Submitted'
    if (status === 'initiated') return 'Initiated'
    if (status === 'in_progress') return 'In Progress'
	if (status === 'cbs_failed') return 'CBS Failed'
    return getBankingType(status)
}

export function formatProductName(input: string): string {
  return input
    .split('_') 
    .filter(Boolean) 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


export const isApplicationSubmitted = (status: string) => {
    if (status === 'submitted') return true

    return false
}

export const isBusiness = (type: string) => {
	return type === 'business';
}

export const statusColorMap: Record<string, string> = {
	initiated: "bg-gray-500",
	in_progress: "bg-cyan-500",
    submitted: "bg-blue-900",
	rejected: "bg-red-500",
	in_review: "bg-blue-500",
	cbs_failed: "bg-blue-500",
    islamic: "bg-emerald-500",
    conventional: "bg-slate-500",
	default: "bg-gray-400",
};

export function getCircleColor(status: string): string {
	switch (status.toLowerCase()) {
	case 'submitted':
	case 'pending':
		return '#A1A5B7';
	case 'on hold':
		return '#AA7762';
	case 'rejected':
	case 'resubmission requested':
	case 'denied':
		return '#F1416C';
	case 'force rejected':
		return '#990101';
	case 'approved':
	case 'succeed':
	case 'accepted':
		return '#50CD89';
	case 'initiated':
		return '#dec9f0';
	case 'escalated':
		return '#FFC300';
	case 'in progress':
		return '#4A7DFF';
	case 'failed':
		return '#E0646C';
	case 'visit pending':
		return '#5E6278';
	case 'verification failed':
	case 'posow failed':
		return '#E60000';
	case 'logged out':
		return '#3F4254';
	case 'logged in':
		return '#00AFAF';
	case 'offline':
		return '#FF0000';
	case 'online':
		return '#47BE7D';
	case 'doing qc':
		return '#800080';
	case 'idle':
		return '#E4E6EF';
	case 'full wallet':
		return '#47BE7D';
	case 'partial wallet':
		return '#00AFAF';
	case 'disputed':
		return '#F1BC00';
	default:
		return '#EFF2F5';
	}
}