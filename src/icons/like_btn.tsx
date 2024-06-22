import SvgIcon from '@mui/material/SvgIcon';
import { HtmlHTMLAttributes } from 'react';

interface LikeBtnIconProps {
    type: 'like' | 'dislike';
    active: boolean | null;
    onClick: () => void;
    className: string;
}

export default function LikeBtnIcon({ type = "like", active = null, onClick, ...props }: LikeBtnIconProps) {
    const color = "#424259";

    if (type == 'dislike' && active) {
        return <SvgIcon
            width="26" height="25"
            viewBox="0 0 26 25" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            style={{ transform: "rotate(180deg)" }}
            {...props}
        >
            <path d="M1.18182 9.879H4.72727V25H1.18182C0.86838 25 0.56778 24.8672 0.346146 24.6309C0.124513 24.3946 0 24.0741 0 23.7399V11.1391C0 10.8049 0.124513 10.4844 0.346146 10.2481C0.56778 10.0118 0.86838 9.879 1.18182 9.879ZM7.43718 8.24971L15.0008 0.185176C15.1013 0.0776832 15.2349 0.0125026 15.3769 0.00162154C15.5189 -0.00925956 15.6598 0.0348904 15.7737 0.125952L16.7818 0.932405C17.0618 1.1565 17.2733 1.46398 17.3896 1.81605C17.5059 2.16812 17.5218 2.54902 17.4354 2.91074L16.0727 8.61892H23.6364C24.2632 8.61892 24.8644 8.88443 25.3077 9.35706C25.751 9.82968 26 10.4707 26 11.1391V13.7903C26.0003 14.1196 25.9401 14.4458 25.8227 14.7505L22.165 24.22C22.0758 24.4509 21.9242 24.6483 21.7296 24.7871C21.535 24.926 21.306 25.0001 21.0718 25H8.27273C7.95929 25 7.65869 24.8672 7.43706 24.6309C7.21542 24.3946 7.09091 24.0741 7.09091 23.7399V9.14059C7.09098 8.80642 7.21553 8.48597 7.43718 8.24971Z"
                fill="#ff3217"
                fill-opacity="0.7"
            />
        </SvgIcon>;
    }

    if (type == 'dislike' && !active) {
        return <SvgIcon
            onClick={onClick}

            width="26" height="25"
            viewBox="0 0 26 25" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M9.92727 15.9621H2.36364C1.73676 15.9621 1.13556 15.7034 0.692294 15.2428C0.249027 14.7823 1.2578e-06 14.1577 1.2578e-06 13.5064V10.923C-0.000317385 10.6021 0.0599088 10.2842 0.177274 9.98737L3.83618 0.76127C3.92515 0.536269 4.07644 0.343793 4.27086 0.208259C4.46527 0.0727248 4.69406 0.000240009 4.92818 0H24.8182C25.1316 0 25.4322 0.129363 25.6539 0.35963C25.8755 0.589898 26 0.902207 26 1.22785V13.5064C26 13.832 25.8755 14.1444 25.6539 14.3746C25.4322 14.6049 25.1316 14.7343 24.8182 14.7343H20.7031C20.5139 14.7342 20.3274 14.7814 20.1594 14.8717C19.9914 14.9621 19.8467 15.0931 19.7375 15.2536L13.2931 24.74C13.2116 24.86 13.0915 24.9456 12.9545 24.9814C12.8174 25.0173 12.6726 25.0009 12.5462 24.9353L10.4024 23.8204C9.79904 23.5071 9.31706 22.9887 9.0365 22.3515C8.75594 21.7142 8.69369 20.9964 8.86009 20.3173L9.92727 15.9621ZM18.9091 12.7844V2.45571H5.72L2.36364 10.923V13.5064H9.92727C10.2873 13.5065 10.6425 13.5919 10.9658 13.7563C11.2892 13.9207 11.5721 14.1597 11.793 14.4549C12.014 14.7502 12.1671 15.094 12.2407 15.4601C12.3142 15.8262 12.3064 16.205 12.2176 16.5674L11.1505 20.9239C11.1171 21.0598 11.1294 21.2034 11.1856 21.331C11.2417 21.4585 11.3381 21.5623 11.4589 21.625L12.2401 22.0302L17.8065 13.8379C18.1019 13.4033 18.4801 13.0472 18.9091 12.7844ZM21.2727 12.2785H23.6364V2.45571H21.2727V12.2785Z"
                fill-opacity="0.7"
                fill="#424259"
            />
        </SvgIcon>;
    }

    if (type == 'like' && active) {
        return <SvgIcon
            onClick={onClick}

            width="26" height="25"
            viewBox="0 0 26 25" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path d="M1.18182 9.879H4.72727V25H1.18182C0.86838 25 0.56778 24.8672 0.346146 24.6309C0.124513 24.3946 0 24.0741 0 23.7399V11.1391C0 10.8049 0.124513 10.4844 0.346146 10.2481C0.56778 10.0118 0.86838 9.879 1.18182 9.879ZM7.43718 8.24971L15.0008 0.185176C15.1013 0.0776832 15.2349 0.0125026 15.3769 0.00162154C15.5189 -0.00925956 15.6598 0.0348904 15.7737 0.125952L16.7818 0.932405C17.0618 1.1565 17.2733 1.46398 17.3896 1.81605C17.5059 2.16812 17.5218 2.54902 17.4354 2.91074L16.0727 8.61892H23.6364C24.2632 8.61892 24.8644 8.88443 25.3077 9.35706C25.751 9.82968 26 10.4707 26 11.1391V13.7903C26.0003 14.1196 25.9401 14.4458 25.8227 14.7505L22.165 24.22C22.0758 24.4509 21.9242 24.6483 21.7296 24.7871C21.535 24.926 21.306 25.0001 21.0718 25H8.27273C7.95929 25 7.65869 24.8672 7.43706 24.6309C7.21542 24.3946 7.09091 24.0741 7.09091 23.7399V9.14059C7.09098 8.80642 7.21553 8.48597 7.43718 8.24971Z"
                fill="#065BFB"
                fill-opacity="0.7"
            />
        </SvgIcon>;
    }

    return <SvgIcon
        onClick={onClick}
        width="26" height="25"
        viewBox="0 0 26 25" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M1.18182 9.879H4.72727V25H1.18182C0.86838 25 0.56778 24.8672 0.346146 24.6309C0.124513 24.3946 0 24.0741 0 23.7399V11.1391C0 10.8049 0.124513 10.4844 0.346146 10.2481C0.56778 10.0118 0.86838 9.879 1.18182 9.879ZM7.43718 8.24971L15.0008 0.185176C15.1013 0.0776832 15.2349 0.0125026 15.3769 0.00162154C15.5189 -0.00925956 15.6598 0.0348904 15.7737 0.125952L16.7818 0.932405C17.0618 1.1565 17.2733 1.46398 17.3896 1.81605C17.5059 2.16812 17.5218 2.54902 17.4354 2.91074L16.0727 8.61892H23.6364C24.2632 8.61892 24.8644 8.88443 25.3077 9.35706C25.751 9.82968 26 10.4707 26 11.1391V13.7903C26.0003 14.1196 25.9401 14.4458 25.8227 14.7505L22.165 24.22C22.0758 24.4509 21.9242 24.6483 21.7296 24.7871C21.535 24.926 21.306 25.0001 21.0718 25H8.27273C7.95929 25 7.65869 24.8672 7.43706 24.6309C7.21542 24.3946 7.09091 24.0741 7.09091 23.7399V9.14059C7.09098 8.80642 7.21553 8.48597 7.43718 8.24971Z"
            fill="#424259"
            fill-opacity="0.7"
        />
    </SvgIcon>

    // if (type == 'like' && !active) {
    //     return <SvgIcon 
    //                             width="26" height="25" 
    //                             viewBox="0 0 26 25" fill="none" 
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             {...props}
    //                             style={{transform: "rotate(180deg)"}}
    //                         >
    //                     <path d="M9.92727 15.9621H2.36364C1.73676 15.9621 1.13556 15.7034 0.692294 15.2428C0.249027 14.7823 1.2578e-06 14.1577 1.2578e-06 13.5064V10.923C-0.000317385 10.6021 0.0599088 10.2842 0.177274 9.98737L3.83618 0.76127C3.92515 0.536269 4.07644 0.343793 4.27086 0.208259C4.46527 0.0727248 4.69406 0.000240009 4.92818 0H24.8182C25.1316 0 25.4322 0.129363 25.6539 0.35963C25.8755 0.589898 26 0.902207 26 1.22785V13.5064C26 13.832 25.8755 14.1444 25.6539 14.3746C25.4322 14.6049 25.1316 14.7343 24.8182 14.7343H20.7031C20.5139 14.7342 20.3274 14.7814 20.1594 14.8717C19.9914 14.9621 19.8467 15.0931 19.7375 15.2536L13.2931 24.74C13.2116 24.86 13.0915 24.9456 12.9545 24.9814C12.8174 25.0173 12.6726 25.0009 12.5462 24.9353L10.4024 23.8204C9.79904 23.5071 9.31706 22.9887 9.0365 22.3515C8.75594 21.7142 8.69369 20.9964 8.86009 20.3173L9.92727 15.9621ZM18.9091 12.7844V2.45571H5.72L2.36364 10.923V13.5064H9.92727C10.2873 13.5065 10.6425 13.5919 10.9658 13.7563C11.2892 13.9207 11.5721 14.1597 11.793 14.4549C12.014 14.7502 12.1671 15.094 12.2407 15.4601C12.3142 15.8262 12.3064 16.205 12.2176 16.5674L11.1505 20.9239C11.1171 21.0598 11.1294 21.2034 11.1856 21.331C11.2417 21.4585 11.3381 21.5623 11.4589 21.625L12.2401 22.0302L17.8065 13.8379C18.1019 13.4033 18.4801 13.0472 18.9091 12.7844ZM21.2727 12.2785H23.6364V2.45571H21.2727V12.2785Z" 
    //                         fill-opacity="0.7"
    //                         fill="#424259"                        
    //                     />
    //                 </SvgIcon>;
    // }
    // switch(type){
    //     case 'dislike':
    //         switch(active){
    //             case true: 
    //                 return <SvgIcon 
    //                     width="26" height="25" 
    //                     viewBox="0 0 26 25" fill="none" 
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     {...props}
    //                     style={{transform: "rotate(180deg)"}}
    //                 >
    //                     <path d="M1.18182 9.879H4.72727V25H1.18182C0.86838 25 0.56778 24.8672 0.346146 24.6309C0.124513 24.3946 0 24.0741 0 23.7399V11.1391C0 10.8049 0.124513 10.4844 0.346146 10.2481C0.56778 10.0118 0.86838 9.879 1.18182 9.879ZM7.43718 8.24971L15.0008 0.185176C15.1013 0.0776832 15.2349 0.0125026 15.3769 0.00162154C15.5189 -0.00925956 15.6598 0.0348904 15.7737 0.125952L16.7818 0.932405C17.0618 1.1565 17.2733 1.46398 17.3896 1.81605C17.5059 2.16812 17.5218 2.54902 17.4354 2.91074L16.0727 8.61892H23.6364C24.2632 8.61892 24.8644 8.88443 25.3077 9.35706C25.751 9.82968 26 10.4707 26 11.1391V13.7903C26.0003 14.1196 25.9401 14.4458 25.8227 14.7505L22.165 24.22C22.0758 24.4509 21.9242 24.6483 21.7296 24.7871C21.535 24.926 21.306 25.0001 21.0718 25H8.27273C7.95929 25 7.65869 24.8672 7.43706 24.6309C7.21542 24.3946 7.09091 24.0741 7.09091 23.7399V9.14059C7.09098 8.80642 7.21553 8.48597 7.43718 8.24971Z" 
    //                         fill="#ff3217"
    //                         fill-opacity="0.7"
    //                     />
    //                 </SvgIcon>;
    //                 break;

    //             default:
    //                 return <SvgIcon 
    //                             width="26" height="25" 
    //                             viewBox="0 0 26 25" fill="none" 
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             {...props}
    //                         >
    //                     <path d="M9.92727 15.9621H2.36364C1.73676 15.9621 1.13556 15.7034 0.692294 15.2428C0.249027 14.7823 1.2578e-06 14.1577 1.2578e-06 13.5064V10.923C-0.000317385 10.6021 0.0599088 10.2842 0.177274 9.98737L3.83618 0.76127C3.92515 0.536269 4.07644 0.343793 4.27086 0.208259C4.46527 0.0727248 4.69406 0.000240009 4.92818 0H24.8182C25.1316 0 25.4322 0.129363 25.6539 0.35963C25.8755 0.589898 26 0.902207 26 1.22785V13.5064C26 13.832 25.8755 14.1444 25.6539 14.3746C25.4322 14.6049 25.1316 14.7343 24.8182 14.7343H20.7031C20.5139 14.7342 20.3274 14.7814 20.1594 14.8717C19.9914 14.9621 19.8467 15.0931 19.7375 15.2536L13.2931 24.74C13.2116 24.86 13.0915 24.9456 12.9545 24.9814C12.8174 25.0173 12.6726 25.0009 12.5462 24.9353L10.4024 23.8204C9.79904 23.5071 9.31706 22.9887 9.0365 22.3515C8.75594 21.7142 8.69369 20.9964 8.86009 20.3173L9.92727 15.9621ZM18.9091 12.7844V2.45571H5.72L2.36364 10.923V13.5064H9.92727C10.2873 13.5065 10.6425 13.5919 10.9658 13.7563C11.2892 13.9207 11.5721 14.1597 11.793 14.4549C12.014 14.7502 12.1671 15.094 12.2407 15.4601C12.3142 15.8262 12.3064 16.205 12.2176 16.5674L11.1505 20.9239C11.1171 21.0598 11.1294 21.2034 11.1856 21.331C11.2417 21.4585 11.3381 21.5623 11.4589 21.625L12.2401 22.0302L17.8065 13.8379C18.1019 13.4033 18.4801 13.0472 18.9091 12.7844ZM21.2727 12.2785H23.6364V2.45571H21.2727V12.2785Z" 
    //                         fill-opacity="0.7"
    //                         fill="#424259"                        
    //                     />
    //                 </SvgIcon>;

    //                 break;

    //             // default:
    //             //     return <SvgIcon 
    //             //         width="26" height="25" 
    //             //         viewBox="0 0 26 25" fill="none" 
    //             //         xmlns="http://www.w3.org/2000/svg"
    //             //         {...props}
    //             //         style={{transform: "rotate(180deg)"}}
    //             //     >
    //             //         <path d="M1.18182 9.879H4.72727V25H1.18182C0.86838 25 0.56778 24.8672 0.346146 24.6309C0.124513 24.3946 0 24.0741 0 23.7399V11.1391C0 10.8049 0.124513 10.4844 0.346146 10.2481C0.56778 10.0118 0.86838 9.879 1.18182 9.879ZM7.43718 8.24971L15.0008 0.185176C15.1013 0.0776832 15.2349 0.0125026 15.3769 0.00162154C15.5189 -0.00925956 15.6598 0.0348904 15.7737 0.125952L16.7818 0.932405C17.0618 1.1565 17.2733 1.46398 17.3896 1.81605C17.5059 2.16812 17.5218 2.54902 17.4354 2.91074L16.0727 8.61892H23.6364C24.2632 8.61892 24.8644 8.88443 25.3077 9.35706C25.751 9.82968 26 10.4707 26 11.1391V13.7903C26.0003 14.1196 25.9401 14.4458 25.8227 14.7505L22.165 24.22C22.0758 24.4509 21.9242 24.6483 21.7296 24.7871C21.535 24.926 21.306 25.0001 21.0718 25H8.27273C7.95929 25 7.65869 24.8672 7.43706 24.6309C7.21542 24.3946 7.09091 24.0741 7.09091 23.7399V9.14059C7.09098 8.80642 7.21553 8.48597 7.43718 8.24971Z" 
    //             //             fill="#424259"
    //             //             fill-opacity="0.7"
    //             //     />
    //             //     </SvgIcon>
    //         }

    //     default: 
    //         switch(active){
    //             case true:
    //                 return <SvgIcon 
    //                     width="26" height="25" 
    //                     viewBox="0 0 26 25" fill="none" 
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     {...props}
    //                 >
    //                     <path d="M1.18182 9.879H4.72727V25H1.18182C0.86838 25 0.56778 24.8672 0.346146 24.6309C0.124513 24.3946 0 24.0741 0 23.7399V11.1391C0 10.8049 0.124513 10.4844 0.346146 10.2481C0.56778 10.0118 0.86838 9.879 1.18182 9.879ZM7.43718 8.24971L15.0008 0.185176C15.1013 0.0776832 15.2349 0.0125026 15.3769 0.00162154C15.5189 -0.00925956 15.6598 0.0348904 15.7737 0.125952L16.7818 0.932405C17.0618 1.1565 17.2733 1.46398 17.3896 1.81605C17.5059 2.16812 17.5218 2.54902 17.4354 2.91074L16.0727 8.61892H23.6364C24.2632 8.61892 24.8644 8.88443 25.3077 9.35706C25.751 9.82968 26 10.4707 26 11.1391V13.7903C26.0003 14.1196 25.9401 14.4458 25.8227 14.7505L22.165 24.22C22.0758 24.4509 21.9242 24.6483 21.7296 24.7871C21.535 24.926 21.306 25.0001 21.0718 25H8.27273C7.95929 25 7.65869 24.8672 7.43706 24.6309C7.21542 24.3946 7.09091 24.0741 7.09091 23.7399V9.14059C7.09098 8.80642 7.21553 8.48597 7.43718 8.24971Z" 
    //                         fill="#065BFB"
    //                         fill-opacity="0.7"
    //                     />
    //                 </SvgIcon>;
    //                 break;

    //             case false:
    //             default:
    //                 return <SvgIcon 
    //                             width="26" height="25" 
    //                             viewBox="0 0 26 25" fill="none" 
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             {...props}
    //                             style={{transform: "rotate(180deg)"}}
    //                         >
    //                     <path d="M9.92727 15.9621H2.36364C1.73676 15.9621 1.13556 15.7034 0.692294 15.2428C0.249027 14.7823 1.2578e-06 14.1577 1.2578e-06 13.5064V10.923C-0.000317385 10.6021 0.0599088 10.2842 0.177274 9.98737L3.83618 0.76127C3.92515 0.536269 4.07644 0.343793 4.27086 0.208259C4.46527 0.0727248 4.69406 0.000240009 4.92818 0H24.8182C25.1316 0 25.4322 0.129363 25.6539 0.35963C25.8755 0.589898 26 0.902207 26 1.22785V13.5064C26 13.832 25.8755 14.1444 25.6539 14.3746C25.4322 14.6049 25.1316 14.7343 24.8182 14.7343H20.7031C20.5139 14.7342 20.3274 14.7814 20.1594 14.8717C19.9914 14.9621 19.8467 15.0931 19.7375 15.2536L13.2931 24.74C13.2116 24.86 13.0915 24.9456 12.9545 24.9814C12.8174 25.0173 12.6726 25.0009 12.5462 24.9353L10.4024 23.8204C9.79904 23.5071 9.31706 22.9887 9.0365 22.3515C8.75594 21.7142 8.69369 20.9964 8.86009 20.3173L9.92727 15.9621ZM18.9091 12.7844V2.45571H5.72L2.36364 10.923V13.5064H9.92727C10.2873 13.5065 10.6425 13.5919 10.9658 13.7563C11.2892 13.9207 11.5721 14.1597 11.793 14.4549C12.014 14.7502 12.1671 15.094 12.2407 15.4601C12.3142 15.8262 12.3064 16.205 12.2176 16.5674L11.1505 20.9239C11.1171 21.0598 11.1294 21.2034 11.1856 21.331C11.2417 21.4585 11.3381 21.5623 11.4589 21.625L12.2401 22.0302L17.8065 13.8379C18.1019 13.4033 18.4801 13.0472 18.9091 12.7844ZM21.2727 12.2785H23.6364V2.45571H21.2727V12.2785Z" 
    //                         fill-opacity="0.7"
    //                         fill="#424259"                        
    //                     />
    //                 </SvgIcon>;

    //                 break;

    //             // default:
    //             //     return <SvgIcon 
    //             //         width="26" height="25" 
    //             //         viewBox="0 0 26 25" fill="none" 
    //             //         xmlns="http://www.w3.org/2000/svg"
    //             //         {...props}
    //             //     >
    //             //         <path d="M1.18182 9.879H4.72727V25H1.18182C0.86838 25 0.56778 24.8672 0.346146 24.6309C0.124513 24.3946 0 24.0741 0 23.7399V11.1391C0 10.8049 0.124513 10.4844 0.346146 10.2481C0.56778 10.0118 0.86838 9.879 1.18182 9.879ZM7.43718 8.24971L15.0008 0.185176C15.1013 0.0776832 15.2349 0.0125026 15.3769 0.00162154C15.5189 -0.00925956 15.6598 0.0348904 15.7737 0.125952L16.7818 0.932405C17.0618 1.1565 17.2733 1.46398 17.3896 1.81605C17.5059 2.16812 17.5218 2.54902 17.4354 2.91074L16.0727 8.61892H23.6364C24.2632 8.61892 24.8644 8.88443 25.3077 9.35706C25.751 9.82968 26 10.4707 26 11.1391V13.7903C26.0003 14.1196 25.9401 14.4458 25.8227 14.7505L22.165 24.22C22.0758 24.4509 21.9242 24.6483 21.7296 24.7871C21.535 24.926 21.306 25.0001 21.0718 25H8.27273C7.95929 25 7.65869 24.8672 7.43706 24.6309C7.21542 24.3946 7.09091 24.0741 7.09091 23.7399V9.14059C7.09098 8.80642 7.21553 8.48597 7.43718 8.24971Z" 
    //             //             fill="#424259"
    //             //             fill-opacity="0.7"
    //             //     />
    //             //     </SvgIcon>

    //     }
    // }
}