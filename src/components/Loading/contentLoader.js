import React from 'react';
import {Dimensions, View, StyleSheet, Platform} from 'react-native';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const NewFeedContentLoading = ({
  width,
  height,
  backgroundColor,
  foregroundColor,
  style,
  speed,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <ContentLoader
        height={height}
        width={width}
        speed={speed}
        viewBox="0 0 380 150"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect x="18" y="8" rx="50" ry="50" width="56" height="56" />
        <Rect x="95" y="13" rx="4" ry="4" width="70%" height="6" />
        <Rect x="95" y="31" rx="4" ry="4" width="30%" height="5" />
        <Rect x="95" y="49" rx="4" ry="4" width="20%" height="5" />
        <Rect x="25" y="85" rx="4" ry="4" width="85%" height="4" />
        <Rect x="25" y="100" rx="4" ry="4" width="60%" height="4" />
        <Rect x="25" y="115" rx="4" ry="4" width="40%" height="4" />
        <Rect x="25" y="130" rx="4" ry="4" width="20%" height="4" />
      </ContentLoader>
    </View>
  );
};

export const NewFeedTrendingContentLoading = ({
  width,
  height,
  backgroundColor,
  foregroundColor,
  style,
  speed,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <ContentLoader
        height={height}
        width={width}
        speed={speed}
        viewBox="0 0 380 150"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect x="25" y="13" rx="4" ry="4" width="65%" height="6" />
        <Rect x="80%" y="13" rx="4" ry="4" width="65%" height="6" />
        <Rect x="25%" y="31" rx="4" ry="4" width="30%" height="5" />
        <Rect x="80%" y="31" rx="4" ry="4" width="8%" height="5" />
        <Rect x="25" y="50" rx="0" ry="0" width="72" height="83" />
        <Rect x="82%" y="50" rx="0" ry="0" width="72" height="83" />
        <Rect x="113" y="50" rx="0" ry="0" width="72" height="83" />
        <Rect x="200" y="50" rx="0" ry="0" width="72" height="83" />
        <Rect x="25" y="150" rx="4" ry="4" width="65%" height="4" />
        <Rect x="80%" y="150" rx="4" ry="4" width="65%" height="4" />
      </ContentLoader>
    </View>
  );
};

export const StoreLoading = ({
  width,
  height,
  backgroundColor,
  foregroundColor,
  style,
  speed,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <ContentLoader
        height={height}
        width={width}
        speed={speed}
        viewBox="0 0 380 150"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect x="18" y="4" rx="50" ry="50" width="32" height="32" />
        <Rect x="80%" y="8" rx="4" ry="4" width="15%" height="4" />
        <Rect x="18%" y="8" rx="4" ry="4" width="40%" height="5" />
        <Rect x="18%" y="25" rx="4" ry="4" width="20%" height="4" />
        <Rect x="25" y="50" rx="0" ry="0" width="72" height="83" />
        <Rect x="76%" y="50" rx="0" ry="0" width="72" height="83" />
        <Rect x="113" y="50" rx="0" ry="0" width="72" height="83" />
        <Rect x="200" y="50" rx="0" ry="0" width="72" height="83" />
      </ContentLoader>
    </View>
  );
};

export const CategoriesLeftLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <ContentLoader
        height={25}
        width={25}
        speed={speed}
        viewBox="0 0 10 10"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect width={25} height={25} />
      </ContentLoader>
      <ContentLoader
        height={20}
        width={50}
        speed={speed}
        viewBox="0 0 50 10"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect y="10" width={50} height={10} />
      </ContentLoader>
    </View>
  );
};

export const CategoriesRightLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <ContentLoader
        height={50}
        width={50}
        speed={speed}
        viewBox="0 0 50 50"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect rx="50" ry="50" width={50} height={50} />
      </ContentLoader>
      <ContentLoader
        height={20}
        width={50}
        speed={speed}
        viewBox="0 0 50 10"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect y="10" width={50} height={10} />
      </ContentLoader>
    </View>
  );
};

export const ProductLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <ContentLoader
        height={height}
        width={width}
        speed={speed}
        viewBox="0 0 10 10"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect width={width} height={25} />
      </ContentLoader>
      <ContentLoader
        height={50}
        width={width}
        speed={speed}
        viewBox={'0 0 ' + width + ' 50'}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect y={10} width={width} height={10} />
        <Rect y={30} width={width} height={5} />
        <Rect y={40} width={width} height={5} />
      </ContentLoader>
    </View>
  );
};

export const TopSearchLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <View style={StyleSheet.flatten([style])}>
      <ContentLoader
        speed={2}
        width={60}
        height={30}
        viewBox="0 0 60 30"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect rx="15" ry="15" width="60" height="30" />
      </ContentLoader>
    </View>
  );
};

export const ReviewRatingLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <ContentLoader
        height={height - 100}
        width={width}
        speed={speed}
        viewBox="0 0 10 10"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect width={width} height={25} />
      </ContentLoader>
      <ContentLoader
        height={100}
        width={width}
        speed={speed}
        viewBox={'0 0 ' + width + ' 30'}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect y={0} width={width} height={10} />
        <Rect y={15} width={width} height={10} />
        <Rect y={30} width={width * 0.7} height={10} />
        <Rect y={45} width={width * 0.4} height={10} />
      </ContentLoader>
    </View>
  );
};

export const FeaturedCategoriesLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={'0 0 ' + width + ' ' + height}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}>
      <Rect rx="15" ry="15" width={width} height={height} />
    </ContentLoader>
  );
};

export const HintKeywordLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <ContentLoader
        height={height}
        width={width}
        speed={speed}
        viewBox="0 0 10 10"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect y={10} width={width * 0.9} height={10} />
      </ContentLoader>
      <ContentLoader
        height={50}
        width={width}
        speed={speed}
        viewBox={'0 0 ' + width + ' 50'}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect y={10} width={width * 0.7} height={10} />
        <Rect y={30} width={width * 0.6} height={8} />
        <Rect y={40} width={width} height={8} />
      </ContentLoader>
    </View>
  );
};

export const ChatListLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => (
  <View style={StyleSheet.flatten([styles.container, style])}>
    <ContentLoader
      speed={speed}
      width={width}
      height={height}
      viewBox={`0 0 ${width} 182`}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}>
      <Rect x="64" y="8" rx="3" ry="3" width="88" height="6" />
      <Rect x="64" y="26" rx="3" ry="3" width="178" height="6" />
      <Circle cx="34" cy="24" r="18" />
      <Rect x="16" y="52" rx="0" ry="0" width={width - 32} height="1" />
      <Rect x="64" y="70" rx="3" ry="3" width="88" height="6" />
      <Rect x="64" y="88" rx="3" ry="3" width="178" height="6" />
      <Circle cx="34" cy="86" r="18" />
      <Rect x="16" y="114" rx="0" ry="0" width={width - 32} height="1" />
      <Rect x="64" y="132" rx="3" ry="3" width="88" height="6" />
      <Rect x="64" y="150" rx="3" ry="3" width="178" height="6" />
      <Circle cx="34" cy="148" r="18" />
      <Rect x="16" y="176" rx="0" ry="0" width={width - 32} height="1" />
    </ContentLoader>
  </View>
);

export const ChatDetailLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => (
  <View style={StyleSheet.flatten([styles.container, style])}>
    <ContentLoader
      speed={speed}
      width={width}
      height={height}
      viewBox="0 0 400 600"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}>
      <Rect x="22" y="8" rx="6" ry="6" width={width - 32} height="50" />
      <Circle cx="35" cy="134" r="10" />
      <Rect x="53" y="71" rx="5" ry="5" width="133" height="34" />
      <Rect x="53" y="110" rx="5" ry="5" width="201" height="34" />
      <Rect x={width - 140} y="170" rx="5" ry="5" width="133" height="34" />
      <Rect x={width - 208} y="208" rx="5" ry="5" width="201" height="34" />
      <Circle cx="35" cy="332" r="10" />
      <Rect x="53" y="270" rx="5" ry="5" width="133" height="34" />
      <Rect x="53" y="308" rx="5" ry="5" width="201" height="34" />
    </ContentLoader>
  </View>
);

export const SearchProductLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <ContentLoader
        height={height - 100}
        width={width}
        speed={speed}
        viewBox="0 0 10 10"
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect width={width} height={25} />
      </ContentLoader>
      <ContentLoader
        height={100}
        width={width}
        speed={speed}
        viewBox={'0 0 ' + width + ' 30'}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect y={0} width={width} height={10} />
        <Rect y={15} width={width} height={10} />
        <Rect y={30} width={width * 0.7} height={10} />
        <Rect y={45} width={width * 0.4} height={10} />
      </ContentLoader>
    </View>
  );
};
export const ProductDetailLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <ContentLoader
        height={height * 0.6}
        width={width * 0.95}
        speed={speed}
        viewBox={`0 0 1 1`}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect width={width} height={25} />
      </ContentLoader>
      <ContentLoader
        height={height * 0.4}
        width={width * 0.95}
        speed={speed}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect y={10} width={width * 0.7} height={20} />
        <Rect y={10} x={width * 0.8} width={width * 0.2} height={20} />
        <Rect y={40} width={width * 0.4} height={20} />
        <Rect y={70} width={width * 0.35} height={20} />
        <Rect y={70} x={width * 0.3} width={width * 0.7} height={20} />
        <Rect y={100} width={width * 0.9} height={20} />
        <Rect y={130} width={width} height={20} />
        <Rect y={160} width={width * 0.5} height={20} />
        <Rect y={190} width={width * 0.8} height={20} />
        <Rect y={220} width={width * 0.7} height={20} />
        <Rect y={250} width={width} height={20} />
        <Rect y={280} width={width * 0.5} height={20} />
      </ContentLoader>
    </View>
  );
};

export const VouchersLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <View style={StyleSheet.flatten([styles.container])}>
      <ContentLoader
        speed={2}
        width={width * 0.95}
        height={124}
        viewBox={`0 0 ${width} 124`}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}>
        <Rect x="64" y="8" rx="3" ry="3" width="87" height="10" />
        <Rect x="65" y="26" rx="3" ry="3" width="330" height="10" />
        <Rect x="9" y="67" rx="3" ry="3" width="305" height="8" />
        <Rect x="331" y="66" rx="3" ry="3" width="60" height="26" />
        <Circle cx="31" cy="23" r="23" />
        <Rect x="9" y="82" rx="3" ry="3" width="241" height="8" />
      </ContentLoader>
    </View>
  );
};

export const PostProductCategoryLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}>
      <Rect x="35" y="10" rx="5" ry="5" width={width} height="10" />
      <Rect x="35" y="45" rx="5" ry="5" width={width} height="10" />
      <Rect x="35" y="80" rx="5" ry="5" width={width} height="10" />
      <Rect x="35" y="115" rx="5" ry="5" width={width} height="10" />
      <Rect x="3" y="5" rx="4" ry="4" width="20" height="20" />
      <Rect x="3" y="40" rx="4" ry="4" width="20" height="20" />
      <Rect x="3" y="75" rx="4" ry="4" width="20" height="20" />
      <Rect x="3" y="110" rx="4" ry="4" width="20" height="20" />
    </ContentLoader>
  );
};
export const BrandListLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <ContentLoader
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}>
      <Circle cx="76" cy="38" r="38" />
      <Rect x="64" y="83" rx="5" ry="5" width="25" height="10" />
      <Circle cx="197" cy="38" r="38" />
      <Rect x="184" y="83" rx="5" ry="5" width="25" height="10" />
      <Circle cx="318" cy="38" r="38" />
      <Rect x="306" y="83" rx="5" ry="5" width="25" height="10" />
    </ContentLoader>
  );
};
export const NotiLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <ContentLoader
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      speed={speed}>
      <Circle cx="60.2" cy="83.2" r="40.3" />
      <Rect x="129.9" y="39.5" width="135.5" height="10" />
      <Rect x="129.9" y="64.7" width="306" height="10" />
      <Rect x="129.9" y="87.8" width="263.5" height="10" />
      <Rect x="129.9" y="112.3" width="222.5" height="10" />
    </ContentLoader>
  );
};

export const PostLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <ContentLoader
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      speed={speed}>
      <Circle cx="31" cy="31" r="15" />
      <Rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
      <Rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
      <Rect x="0" y="60" rx="2" ry="2" width={width} height={width} />
    </ContentLoader>
  );
};

export const ImageGrid = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <ContentLoader
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      speed={speed}>
      <Rect x="12" y="0" rx="2" ry="2" width={width / 2} height={width / 2} />
      <Rect
        x={width / 2 - 10}
        y="0"
        rx="2"
        ry="2"
        width={width / 2}
        height={width / 2}
      />
    </ContentLoader>
  );
};

export const OrdersLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <ContentLoader
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      speed={speed}>
      <Rect x="301" y="5" rx="3" ry="3" width="62" height="8" />
      <Rect x="300" y="16" rx="3" ry="3" width="52" height="6" />
      <Circle cx="16" cy="15" r="14" />
      <Rect x="3" y="43" rx="3" ry="3" width="48" height="49" />
      <Rect x="65" y="47" rx="3" ry="3" width="287" height="7" />
      <Rect x="65" y="62" rx="3" ry="3" width="100" height="8" />
      <Rect x="247" y="62" rx="3" ry="3" width="100" height="7" />
      <Rect x="65" y="80" rx="3" ry="3" width="238" height="7" />
      <Rect x="4" y="103" rx="3" ry="3" width="100" height="8" />
      <Rect x="260" y="100" rx="3" ry="3" width="100" height="8" />
    </ContentLoader>
  );
};

export const OrderDetailsLoading = ({
  backgroundColor,
  foregroundColor,
  style,
  speed,
  width,
  height,
}) => {
  return (
    <ContentLoader
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      speed={speed}>
      <Rect x="3" y="3" rx="10" ry="10" width={width} height="180" />
      <Rect x="6" y="190" rx="0" ry="0" width={width - 10} height="20" />
      <Rect x="4" y="215" rx="0" ry="0" width="239" height="20" />
      <Rect x="4" y="242" rx="0" ry="0" width="274" height="20" />
    </ContentLoader>
  );
};

HintKeywordLoading.defaultProps = {
  height: 10,
  width: deviceWidth,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};

ReviewRatingLoading.defaultProps = {
  height: 10,
  width: deviceWidth,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};

NewFeedContentLoading.defaultProps = {
  height: 190,
  width: deviceWidth,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};

NewFeedTrendingContentLoading.defaultProps = {
  height: Platform.OS === 'android' ? 200 : 250,
  width: deviceWidth,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};

StoreLoading.defaultProps = {
  height: Platform.OS === 'android' ? 160 : 170,
  width: deviceWidth,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};

CategoriesLeftLoading.defaultProps = {
  height: 100,
  width: 100,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};

CategoriesRightLoading.defaultProps = {
  height: 100,
  width: 100,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};

ProductLoading.defaultProps = {
  height: 100,
  width: 100,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};

TopSearchLoading.defaultProps = {
  height: 100,
  width: 100,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};

FeaturedCategoriesLoading.defaultProps = {
  height: 100,
  width: 100,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};
SearchProductLoading.defaultProps = {
  height: (deviceHeight - 200) / 2,
  width: deviceWidth / 2 - 32,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};
ChatListLoading.defaultProps = {
  height: 186,
  width: deviceWidth,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};
ChatDetailLoading.defaultProps = {
  height: deviceWidth * 1.5,
  width: deviceWidth,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};
ProductDetailLoading.defaultProps = {
  height: deviceHeight,
  width: deviceWidth,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {
    height: deviceHeight,
  },
  speed: 1.2,
};

VouchersLoading.defaultProps = {
  height: deviceWidth / 2,
  width: deviceWidth,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {},
  speed: 1.2,
};

PostProductCategoryLoading.defaultProps = {
  height: 150,
  width: deviceWidth * 0.9,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {
    height: deviceHeight,
  },
  speed: 1.2,
};
BrandListLoading.defaultProps = {
  height: 100,
  width: deviceWidth * 0.95,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {
    height: deviceHeight,
  },
  speed: 1.2,
};
NotiLoading.defaultProps = {
  height: 100,
  width: deviceWidth * 0.95,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {
    height: deviceHeight,
  },
  speed: 1.2,
};
PostLoading.defaultProps = {
  height: deviceWidth,
  width: deviceWidth - 32,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {
    height: deviceHeight,
  },
  speed: 1.2,
};
ImageGrid.defaultProps = {
  height: deviceWidth / 2,
  width: deviceWidth,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {
    height: deviceHeight,
  },
  speed: 1.2,
};
OrdersLoading.defaultProps = {
  height: deviceWidth / 4,
  width: deviceWidth,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {
    height: deviceHeight,
  },
  speed: 1.2,
};
OrderDetailsLoading.defaultProps = {
  height: deviceWidth * 0.65,
  width: deviceWidth - 32,
  backgroundColor: '#d9d9d9',
  foregroundColor: '#ecebeb',
  style: {
    height: deviceHeight,
  },
  speed: 1.2,
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
