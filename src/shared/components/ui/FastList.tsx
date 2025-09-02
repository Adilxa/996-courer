import React, { memo, useMemo } from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  ViewStyle,
} from 'react-native';

interface FastListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor?: (item: T, index: number) => string;
  itemHeight?: number;
  style?: ViewStyle;
}

// Memoized list item wrapper for better performance
const MemoizedItem = memo(({ item, index, renderItem }: any) => {
  return renderItem({ item, index });
});

export function FastList<T>({
  data,
  renderItem,
  keyExtractor,
  itemHeight,
  style,
  ...props
}: FastListProps<T>) {
  // Memoize the render function to prevent unnecessary re-renders
  const memoizedRenderItem = useMemo(
    () => ({ item, index }: { item: T; index: number }) => (
      <MemoizedItem
        item={item}
        index={index}
        renderItem={renderItem}
      />
    ),
    [renderItem]
  );

  // Default key extractor
  const defaultKeyExtractor = useMemo(
    () => keyExtractor || ((item: any, index: number) => 
      item.id?.toString() || index.toString()
    ),
    [keyExtractor]
  );

  return (
    <FlatList
      data={data}
      renderItem={memoizedRenderItem}
      keyExtractor={defaultKeyExtractor}
      style={style}
      // Performance optimizations
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      initialNumToRender={10}
      windowSize={10}
      getItemLayout={
        itemHeight
          ? (data, index) => ({
              length: itemHeight,
              offset: itemHeight * index,
              index,
            })
          : undefined
      }
      // Prevent unnecessary re-renders
      keyboardShouldPersistTaps="handled"
      {...props}
    />
  );
}

// Fast ScrollView component with performance optimizations
export const FastScrollView = memo(({ children, ...props }: any) => {
  return (
    <FlatList
      data={[{ key: 'content' }]}
      renderItem={() => children}
      keyExtractor={(item) => item.key}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false}
      {...props}
    />
  );
});

FastScrollView.displayName = 'FastScrollView';
