import * as react_jsx_runtime from 'react/jsx-runtime';

interface ApplicationDetailsProps {
    id: string | number;
    baseUrl: string;
    preloadKey?: string;
    showActionsBtn?: boolean;
    loadingApprove?: boolean;
    loadingReject?: boolean;
    handleApprove?: () => void;
    handleReject?: () => void;
    apiKey: string;
}
declare function ApplicationDetails({ id, baseUrl, preloadKey, showActionsBtn, loadingApprove, loadingReject, handleApprove, handleReject, apiKey, }: ApplicationDetailsProps): react_jsx_runtime.JSX.Element;

interface Props {
    apiKey: string;
    url?: string;
}
declare const ApplicationSection: ({ apiKey, url }: Props) => react_jsx_runtime.JSX.Element;

export { ApplicationDetails, ApplicationSection };
