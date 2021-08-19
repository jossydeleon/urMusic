import React, { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Divider from '../Divider';
import { FunctionComponent } from 'react';
import { PopupOptionProps } from './types';

type Props = {
  show?: boolean;
  orientation?: string;
  options?: PopupOptionProps[];
  title?: string;
  titleStyle?: object;
  containerStyle?: object;
  contentStyle?: object;
  containerListStyle?: object;
  initialOffsetFromBottom?: number;
  showCancel?: boolean;
  cancelLabel?: string;
  CustomTitleComponent?: JSX.Element;
  CustomComponent?: JSX.Element;
  onClose: () => void;
};

const PopupSheetMenu: FunctionComponent<Props> = ({
  show,
  orientation,
  options,
  title = 'Title',
  titleStyle,
  CustomTitleComponent,
  containerStyle,
  contentStyle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  containerListStyle,
  initialOffsetFromBottom = 3.0,
  onClose,
  showCancel = false,
  cancelLabel,
  CustomComponent,
}) => {
  const actionSheetRef = createRef<ActionSheet>();

  useEffect(() => {
    actionSheetRef.current?.setModalVisible(show);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  /**
   * List component showing options
   */
  function ListComponent() {
    return (
      <>
        {options &&
          options.map((option, index) => (
            <View key={index} style={styles.optionsContainer}>
              <TouchableOpacity onPress={option.onPress}>
                <Text style={styles.itemName}>{option.name}</Text>
              </TouchableOpacity>
              <Divider />
            </View>
          ))}
        {showCancel && (
          <View style={styles.cancelContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelOpacity}>
              <Text style={styles.itemCancel}>{cancelLabel || 'Cancel'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }

  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={containerStyle}
      initialOffsetFromBottom={initialOffsetFromBottom}
      bounceOnOpen={true}
      bounciness={0}
      gestureEnabled={true}
      defaultOverlayOpacity={0.4}
      onClose={onClose}>
      <View style={[styles.containerPopup, contentStyle]}>
        <View style={styles.titleContainer}>
          {CustomTitleComponent || (
            <Text style={{ ...styles.titleStyle, ...titleStyle }}>{title}</Text>
          )}
        </View>

        <View
          style={
            orientation && orientation === 'horizontal'
              ? styles.containerHorizontalList
              : styles.containerVerticalList
          }>
          {CustomComponent || <ListComponent />}
        </View>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    alignItems: 'center',
  },
  cancelContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  containerPopup: {
    //alignItems: 'center',
  },
  containerHorizontalList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  containerVerticalList: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    //alignItems: 'center',
    padding: 12,
  },
  titleContainer: {
    marginTop: 15,
  },
  titleStyle: {
    //fontSize: theme.font.subheadingSize,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemName: {
    textTransform: 'capitalize',
    //fontSize: theme.font.subheadingSize,
  },
  itemCancel: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    //fontSize: theme.font.subheadingSize,
    color: 'red',
  },
  cancelOpacity: {
    padding: 15,
  },
});

PopupSheetMenu.propTypes = {
  show: PropTypes.bool,
  orientation: PropTypes.string,
  options: PropTypes.any,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  containerListStyle: PropTypes.object,
  initialOffsetFromBottom: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  showCancel: PropTypes.bool,
  cancelLabel: PropTypes.string,
  CustomTitleComponent: PropTypes.element,
  CustomComponent: PropTypes.element,
};

export default PopupSheetMenu;
