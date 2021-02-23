import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

export const Search = ({width = 24, height = 24, color = '#8B9399'}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M20.9999 20.9999L16.6499 16.6499"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const Bag = ({width = 24, height = 24, color = '#8B9399'}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M4.63797 7.9266C4.67683 7.26589 5.22397 6.75 5.88581 6.75H18.1142C18.776 6.75 19.3232 7.26589 19.362 7.9266L20.0645 19.8679C20.1405 21.1602 19.1129 22.25 17.8183 22.25H6.18166C4.88707 22.25 3.85952 21.1602 3.93554 19.8679L4.63797 7.9266Z"
        stroke={color}
        stroke-width="1.5"
      />
      <Path
        d="M16 10V5C16 2.79086 14.2091 1 12 1V1C9.79086 1 8 2.79086 8 5V10"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const FeedStore = ({width = 16, height = 16, color = '#8B9399'}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3.99984 8.66655C4.75628 8.66655 5.37049 8.41405 5.83827 8.10467C5.93606 8.03998 6.06361 8.03998 6.1614 8.10467C6.62918 8.41405 7.2434 8.66655 7.99984 8.66655C8.75628 8.66655 9.37049 8.41405 9.83826 8.10467C9.93606 8.03998 10.0636 8.03998 10.1614 8.10467C10.6292 8.41405 11.2434 8.66655 11.9998 8.66655C12.2941 8.66655 12.5915 8.64162 12.8821 8.5828C13.1065 8.53736 13.3332 8.69936 13.3332 8.92836V11.9999C13.3332 13.1045 12.4377 13.9999 11.3332 13.9999H9.99984C9.63165 13.9999 9.33317 13.7014 9.33317 13.3332V11.3332C9.33317 10.5968 8.73622 9.99988 7.99984 9.99988C7.26346 9.99988 6.6665 10.5968 6.6665 11.3332V13.3332C6.6665 13.7014 6.36803 13.9999 5.99984 13.9999H4.6665C3.56193 13.9999 2.6665 13.1045 2.6665 11.9999V8.92836C2.6665 8.69936 2.89314 8.53736 3.11758 8.5828C3.40821 8.64162 3.70555 8.66655 3.99984 8.66655Z"
        fill={color}
      />
      <Path
        d="M3.26676 2.82521C3.71253 2.27613 4.39733 2 5.10457 2H10.8954C11.6027 2 12.2875 2.27613 12.7332 2.82521C13.3041 3.52832 14 4.54681 14 5.33333C14 6.66667 13.3333 7.33333 12 7.33333C11.0167 7.33333 10.3959 6.60813 10.1378 6.2274C10.0762 6.13645 9.92384 6.13645 9.86218 6.2274C9.60406 6.60813 8.98333 7.33333 8 7.33333C7.01667 7.33333 6.39594 6.60813 6.13782 6.2274C6.07616 6.13645 5.92384 6.13645 5.86218 6.2274C5.60406 6.60813 4.98333 7.33333 4 7.33333C2.66667 7.33333 2 6.66667 2 5.33333C2 4.54681 2.69594 3.52832 3.26676 2.82521Z"
        fill={color}
      />
    </Svg>
  );
};

export const DubHeart = ({width = 16, height = 16, color = '#8B9399'}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M14.3358 5.84819C14.0131 5.30419 13.4984 4.91752 12.8851 4.76019C12.3651 4.62685 11.8264 4.67219 11.3411 4.88819C11.0184 4.46685 10.5678 4.16552 10.0478 4.03219C9.84775 3.98152 9.64775 3.95752 9.44775 3.95752C10.1144 4.41619 10.5891 5.08552 10.7918 5.87752C11.2744 7.76552 10.4398 9.42685 9.48509 10.6135C9.62642 10.7255 9.71975 10.7922 9.72775 10.7975C9.77309 10.8295 9.82642 10.8455 9.87975 10.8455C9.88775 10.8455 9.89842 10.8455 9.90642 10.8429C10.0691 10.8269 13.8851 10.3949 14.5891 7.64552C14.7491 7.03219 14.6584 6.39485 14.3358 5.84819Z"
        fill={color}
      />
      <Path
        d="M7.20257 12.0507C7.15724 12.08 7.1039 12.0987 7.05057 12.0987C7.0399 12.0987 7.0319 12.096 7.02124 12.096C6.82924 12.0747 2.2639 11.5627 1.42124 8.28004C1.0399 6.78138 1.9439 5.25071 3.44257 4.86671C4.0719 4.70671 4.72524 4.76804 5.30924 5.03738C5.69057 4.52004 6.23457 4.15205 6.8639 3.99205C7.58924 3.80538 8.3439 3.91205 8.98924 4.29338C9.6319 4.67471 10.0906 5.28538 10.2772 6.01071C11.1172 9.29338 7.36257 11.9387 7.20257 12.0507Z"
        fill={color}
      />
    </Svg>
  );
};

export const MapPin = ({width = 16, height = 16, color = '#8B9399'}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M10.5 5C10.5 8.5 6 11.5 6 11.5C6 11.5 1.5 8.5 1.5 5C1.5 3.80653 1.97411 2.66193 2.81802 1.81802C3.66193 0.974106 4.80653 0.5 6 0.5C7.19347 0.5 8.33807 0.974106 9.18198 1.81802C10.0259 2.66193 10.5 3.80653 10.5 5Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const ChevronLeft = ({width = 24, height = 24, color = 'black'}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M15 18L9 12L15 6"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const Close = ({width = 28, height = 28, color = 'black'}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect width="28" height="28" rx="14" fill="white" />
      <Path
        d="M18 10L10 18"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10 10L18 18"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
