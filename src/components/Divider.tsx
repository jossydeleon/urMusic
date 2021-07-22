/**
 * Created by @jdl_developer
 * This component is a simple horizontal divider
 */

 import React from "react";
 import { StyleSheet, View, useWindowDimensions } from "react-native";
 import PropTypes from 'prop-types';
 
type Props = {
  color?:string;
  width?:number;
  style?:object;
}

 const Divider: React.FC<Props> = ({ color, width, style }) => {
   
   const windowWidth = useWindowDimensions().width - 50;
 
   return (
     <View
       style={[
         styles.divider,
         { borderBottomColor: color ? color : "#C7C7C7" },
         { width: width ? width : windowWidth }, style
       ]}
     />
   );
 };
 
 const styles = StyleSheet.create({
   divider: {
     borderBottomWidth: 0.4,
     marginLeft: 5,
     marginRight: 5,
   },
 });
 
 Divider.propTypes = {
   color: PropTypes.string,
   width: PropTypes.number
 };
 
 export default Divider;