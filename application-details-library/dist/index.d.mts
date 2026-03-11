import * as react_jsx_runtime from 'react/jsx-runtime';

interface ApplicationDetailsProps {
    id: string | number;
    baseUrl: string;
    showActionsBtn?: boolean;
    apiKey: string;
}
declare function ApplicationDetails({ id, baseUrl, showActionsBtn, apiKey, }: ApplicationDetailsProps): react_jsx_runtime.JSX.Element;

interface Props {
    apiKey: string;
    url?: string;
}
declare const ApplicationSection: ({ apiKey, url }: Props) => react_jsx_runtime.JSX.Element;

export { ApplicationDetails, ApplicationSection };
