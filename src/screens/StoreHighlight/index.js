import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import {Header, ThemeView} from 'components';
import {useDispatch, useSelector} from 'react-redux';
import {storeActions, branchSelectors} from 'reducers';
import ListStoreHighlight from './ListStoreHighlight';
const StoreAddress = () => {
  const dispatch = useDispatch();

  const branchData = useSelector((state) =>
    branchSelectors.getBranchList(state),
  );

  React.useEffect(() => {
    dispatch(storeActions.getHighlightStore());
  }, []);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        middleComponent={
          <Text style={styles.headerTitle}>{i18n.t('storeAddress.title')}</Text>
        }
      />
      <View style={styles.wrapper}>
        <ListStoreHighlight style={styles.list} data={branchData} />
      </View>
    </ThemeView>
  );
};
export default StoreAddress;
