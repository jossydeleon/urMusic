import React from 'react';
import { Icon, IconProps } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Props extends IconProps {
  kind?: 'font-awesome' | 'font-awesome-5';
  primary?: string
}

const IconFontAwesome: React.FC<Props> = ({ kind, primary, ...props }) => {
  return <Icon type={kind} color={primary} size={18} {...props} />;
};

const IconFontAwesomeFive: React.FC<Props> = ({ primary, ...props }) => {
  return <FontAwesome5 color={primary} size={18} {...props} />;
};

IconFontAwesome.defaultProps = {
  kind: 'font-awesome-5',
  primary: 'white',
};

export { IconFontAwesome, IconFontAwesomeFive };
