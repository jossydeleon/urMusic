import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { IconFontAwesome } from './IconFontAwesome';

export interface ToggleButtonProps {
    color?: string;
    icon: string;
    onPress: () => void;
    size?: number;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onPress, icon, size, color }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <IconFontAwesome name={icon} size={size} color={color} />
        </TouchableOpacity>
    );
};

ToggleButton.defaultProps = {
    size: 18,
    color: 'white',
};

export default ToggleButton;
