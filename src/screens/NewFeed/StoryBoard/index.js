import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';

import {Container, Title} from '~/Theme/Container';

import Item from './Item';

import {useBaseHook} from '~/Utils';

import {getVendors} from '~/Store/vendor/service';

import {padding} from '~/Theme/Configs/spacing';

const initHeader = {
  style: {},
};

const StoryBoard = ({fields}) => {
  const {i18n, t} = useBaseHook();
  const [state, setState] = useState({data: [], loading: true});

  if (!fields || typeof fields !== 'object' || Object.keys(fields).length < 1) {
    return null;
  }
  const language = i18n.language;
  const heading = fields.text_heading ? fields.text_heading : initHeader;
  const headerDisable = !fields.boxed ? 'all' : 'none';
  const contentDisable = !fields.boxed ? 'all' : 'right';
  const padEnd = fields.boxed ? padding.large : 0;
  const clickDetailVendor = () => {};
  const limit =
    fields && fields.limit && parseInt(fields.limit)
      ? parseInt(fields.limit)
      : 4;
  const getData = async () => {
    const list = await getVendors({offset: 0, limit});
    setState({data: list, loading: false});
  };
  useEffect(() => {
    getData();
  }, []);
  const {data, loading} = state;

  return (
    <>
      {fields.disable_heading && (
        <Container disable={headerDisable}>
          <Title
            title={
              heading.text && heading.text[language]
                ? heading.text[language]
                : t('common:text_category')
            }
            style={heading.style && heading.style}
            containerStyle={{paddingTop: padding.base}}
            subTitle={t('common:text_show_all')}
            onPress={() => {}}
          />
        </Container>
      )}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Container disable={contentDisable}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={{marginRight: index === data.length - 1 ? padEnd : 10}}
                onPress={() => clickDetailVendor(item)}>
                <Item item={item} style={{flex: 1}} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Container>
      )}
    </>
  );
};

export default StoryBoard;
