import { FC, ReactNode } from 'react';
import { ScrollView, StyleProp, ViewStyle, Platform, KeyboardAvoidingView } from 'react-native';

interface KeyboardAwareScrollViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const KeyboardAwareScrollView: FC<KeyboardAwareScrollViewProps> = ({ 
  children, 
  style,
  contentContainerStyle
}) => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView
        style={style}
        contentContainerStyle={contentContainerStyle}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <ScrollView
      style={style}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
};