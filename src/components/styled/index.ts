import styled from 'styled-components/native';
import { theme } from '../../theme/theme';
import IconFontAwesome from '../IconFontAwesome';

export const BackgroundedButton = styled(IconFontAwesome).attrs(props => ({
  containerStyle: {
    marginLeft: props.left || 0,
    padding: props.padding || 11,
    backgroundColor: props.bgColor || theme.colors.darker,
    borderRadius: 10,
  },
}))``;
