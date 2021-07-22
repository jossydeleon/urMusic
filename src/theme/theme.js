/**
 * Created by @jdl_developer
 * This file contains colors and font sizes used by the theme
 */

 import { DarkTheme } from '@react-navigation/native';
 import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
 
 export const theme = {
   ...DarkTheme.colors,
   colors: {
     ...DarkTheme.colors,   
     primary: '#ff7700',
     //background: '#121212',
     //card: '',
     //text: 'white',
     //border: '',
     //notification: ''

     //custom
     dark: '#202020',
     darker: '#121212',
     
     secondary: 'white',
     gray:'gray',
     lightgray: '#C7C7C7',
     darkgray: '#2b2b2b',
     cgray: '#ececec',
     offlinegray: '#535353',
   },
   font: {
     headerSize: wp('4%'),
     listPrimarySize: wp('3.9%'),
     listSecundarySize: wp('3.8%'),
     h1: wp('6%'),
     h2: wp('5.8%'),
     h3: wp('5.5%'),
     h4: wp('5%'),
     h5: wp('4.5%'),
     h6: wp('4.2'),
     small: wp('3.5')
   }
 };