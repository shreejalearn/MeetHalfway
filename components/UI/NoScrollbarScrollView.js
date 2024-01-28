import React from 'react';
import { ScrollView } from 'react-native';

const NoScrollbarScrollView = (props) => {
  return (
    <ScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default NoScrollbarScrollView;
