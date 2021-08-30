import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, IconProps } from 'react-native-elements';
import { theme } from '../theme/theme';

export interface BackgroundedButtonProps extends IconProps {
    onPress?: () => void;
    left?: number;
    padding?: number;
    bgColor?: string;
    borderRadius?: number;
    color?: string;
}

const BackgroundedButton: React.FC<BackgroundedButtonProps> = ({ bgColor, left, padding, borderRadius, color, onPress, ...props }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Icon
                type={'font-awesome-5'}
                color={color || 'white'}
                backgroundColor={bgColor || theme.colors.darker}
                style={{
                    marginLeft: left || 0,
                    padding: padding || 15,
                    borderRadius: borderRadius || 13,
                }}
                {...props}
            />
        </TouchableOpacity>
    );
};

export default BackgroundedButton;
