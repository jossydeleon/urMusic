import React, {createRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Divider from '../Divider';
import { FunctionComponent } from 'react';

type Props = {
  show?:boolean;
  orientation?:string;
  options?:any[];
  title?:string;
  titleStyle?:object;
  containerStyle?:object;
  contentStyle?:object;
  containerListStyle?:object;
  initialOffsetFromBottom?:number;
  showCancel?:boolean;
  cancelLabel?:string;
  CustomTitleComponent?:any;
  CustomComponent?:any;
  onClose:() => void;
}

const PopupSheetMenu: FunctionComponent<Props> = ({
  show,
  orientation,
  options,
  title = "Title",
  titleStyle,
  CustomTitleComponent,
  containerStyle,
  contentStyle,
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
  }, [show]);

  /**
   * List component showing options
   */
  function ListComponent() {
    return (
      <>
        {options &&
          options.map((option, index) => (
            <View key={index} style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={option.onPress}>
                <Text style={styles.itemName}>{option.name}</Text>
              </TouchableOpacity>
              <Divider />
            </View>
          ))}
        {showCancel && (
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <TouchableOpacity onPress={onClose} style={{padding: 15}}>
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
            <Text style={{...styles.titleStyle, ...titleStyle}}>{title}</Text>
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
