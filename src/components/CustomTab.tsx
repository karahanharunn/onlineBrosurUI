import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Animated, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function CustomTab({data, scrollX, onItemPress, top = 80}) {
  const containerRef = useRef();
  const [Measures, setMeasures] = useState([]);
  useEffect(() => {
    let m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({x, y, width, height});
          if (m.length === data.length) setMeasures(m);
        },
      );
    });
  }, []);
  return (
    <View
      style={{
        position: 'absolute',
        top: top,
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 8,
      }}>
      <View
        ref={containerRef}
        style={{
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          flex: 1,
        }}>
        {data.map((item, index) => {
          return (
            <Tab
              key={item.id}
              item={item}
              onItemPress={() => onItemPress(index)}
              ref={item.ref}
            />
          );
        })}
      </View>
      {Measures.length > 0 && (
        <Indicator data={data} scrollX={scrollX} measures={Measures} />
      )}
    </View>
  );
}
const Tab = React.forwardRef(({item, onItemPress}, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text style={{color: 'black', fontSize: 12}}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
});

const Indicator = ({measures, scrollX, data}) => {
  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: indicatorWidth,
        height: 2,
        backgroundColor: 'orange',
        transform: [{translateX}],
        bottom: 0,
      }}
    />
  );
};
