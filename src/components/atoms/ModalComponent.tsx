import React, { useRef } from 'react';
import { View, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { GRAY_MEDIUM } from '../../styles/colors';
import { Delete } from '../icons';
export interface ModalComponentProps {
  modalVisible?: boolean,
  children: React.ReactNode,
  visible: boolean,
  height: Number,
  setShow: () => void,
  setVisible: () => void,
}
export default function ModalComponent({
  modalVisible,
  children,
  visible,
  height,
  setShow,
  setVisible,
  ...rest
}: ModalComponentProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible]);
  const bottomPosition = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Number(height) + 30, 0],
  });
  return (
    <Animated.View
      style={{
        transform: [{ translateY: bottomPosition }],
        ...styles.info,
      }}
      {...rest}>
      {/* <View style={styles.openButton}>
        <TouchableOpacity key="Open" onPress={setShow}>
          <SvgClose width={24} height={24} fill="white" />
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity onPress={setVisible}>
        <View
          style={{
            width: 30,
            position: 'absolute',
            top: -30,
            padding: 5,
            backgroundColor: 'rgba(0,0,0,0.8)',
            right: 0,
          }}>
          <Delete width={20} height={20} color={GRAY_MEDIUM} />
        </View>
      </TouchableOpacity>
      {children}
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  info: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderColor: GRAY_MEDIUM,
    zIndex: 0,
  },
  openButton: {
    flex: 1,
    alignItems: 'center',
  },
});
