import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../dummyData';

/**
 * TopBar
 * Props: title, showBack, rightIcon (element), onRightPress, centerTitle
 */
export default function TopBar({ title, showBack = false, rightIcon, onRightPress, centerTitle = false }) {
  const navigation = useNavigation();

  return (
    <View style={styles.bar}>
      {/* Left */}
      <View style={styles.side}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="chevron-back" size={22} color={COLORS.text} />
          </TouchableOpacity>
        )}
      </View>

      {/* Title */}
      <Text
        style={[
          styles.title,
          centerTitle && { flex: 1, textAlign: 'center' },
          !showBack && !centerTitle && { marginLeft: 4 },
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Right */}
      <View style={[styles.side, { alignItems: 'flex-end' }]}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    backgroundColor: COLORS.cardAlt,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  side: {
    width: 40,
  },
  title: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  iconBtn: {
    padding: 4,
  },
});
