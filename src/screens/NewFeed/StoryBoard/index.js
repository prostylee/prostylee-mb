import React from 'react';
import {ScrollView, View} from 'react-native';
import {isEmpty} from 'lodash';
import i18n from 'i18n';

import {ContainerView as Container, Title} from 'components';
import {NewFeedTrendingContentLoading} from 'components/Loading/contentLoader';

import Item from './Item';

import styles from './styles';

const StoryBoard = ({storyBoads, loading, navigation}) => {
  // if (isEmpty(storyBoads) || !storyBoads?.content?.length) {
  //   return null;
  // }

  // const listStoryBoads = storyBoads?.content;
  const listStoryBoads = [
    {
      image:
        'https://images.squarespace-cdn.com/content/v1/5442b6cce4b0cf00d1a3bef2/1599593810676-N3UFFCGFVPP3JNARAA8N/ke17ZwdGBToddI8pDm48kIAZ5CWDgAf_tKNKdYtI7ZtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpx78nW6aw6q_OBEgbzlBDLLqtzO1m_sKf16hJRhG3A2FkHtEA23RvFjTTKzL4c-UFU/Affordable-Ethical-Fashion-Pact',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://www.bsbfashion.com/sites/default/files/sites/default/files/custom/_K9A9227_b.jpg',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://images.squarespace-cdn.com/content/v1/5442b6cce4b0cf00d1a3bef2/1599593810676-N3UFFCGFVPP3JNARAA8N/ke17ZwdGBToddI8pDm48kIAZ5CWDgAf_tKNKdYtI7ZtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpx78nW6aw6q_OBEgbzlBDLLqtzO1m_sKf16hJRhG3A2FkHtEA23RvFjTTKzL4c-UFU/Affordable-Ethical-Fashion-Pact',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://www.bsbfashion.com/sites/default/files/sites/default/files/custom/_K9A9227_b.jpg',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://images.squarespace-cdn.com/content/v1/5442b6cce4b0cf00d1a3bef2/1599593810676-N3UFFCGFVPP3JNARAA8N/ke17ZwdGBToddI8pDm48kIAZ5CWDgAf_tKNKdYtI7ZtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpx78nW6aw6q_OBEgbzlBDLLqtzO1m_sKf16hJRhG3A2FkHtEA23RvFjTTKzL4c-UFU/Affordable-Ethical-Fashion-Pact',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://www.bsbfashion.com/sites/default/files/sites/default/files/custom/_K9A9227_b.jpg',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://images.squarespace-cdn.com/content/v1/5442b6cce4b0cf00d1a3bef2/1599593810676-N3UFFCGFVPP3JNARAA8N/ke17ZwdGBToddI8pDm48kIAZ5CWDgAf_tKNKdYtI7ZtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpx78nW6aw6q_OBEgbzlBDLLqtzO1m_sKf16hJRhG3A2FkHtEA23RvFjTTKzL4c-UFU/Affordable-Ethical-Fashion-Pact',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://www.bsbfashion.com/sites/default/files/sites/default/files/custom/_K9A9227_b.jpg',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://images.squarespace-cdn.com/content/v1/5442b6cce4b0cf00d1a3bef2/1599593810676-N3UFFCGFVPP3JNARAA8N/ke17ZwdGBToddI8pDm48kIAZ5CWDgAf_tKNKdYtI7ZtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpx78nW6aw6q_OBEgbzlBDLLqtzO1m_sKf16hJRhG3A2FkHtEA23RvFjTTKzL4c-UFU/Affordable-Ethical-Fashion-Pact',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://www.bsbfashion.com/sites/default/files/sites/default/files/custom/_K9A9227_b.jpg',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://images.squarespace-cdn.com/content/v1/5442b6cce4b0cf00d1a3bef2/1599593810676-N3UFFCGFVPP3JNARAA8N/ke17ZwdGBToddI8pDm48kIAZ5CWDgAf_tKNKdYtI7ZtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpx78nW6aw6q_OBEgbzlBDLLqtzO1m_sKf16hJRhG3A2FkHtEA23RvFjTTKzL4c-UFU/Affordable-Ethical-Fashion-Pact',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://www.bsbfashion.com/sites/default/files/sites/default/files/custom/_K9A9227_b.jpg',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://images.squarespace-cdn.com/content/v1/5442b6cce4b0cf00d1a3bef2/1599593810676-N3UFFCGFVPP3JNARAA8N/ke17ZwdGBToddI8pDm48kIAZ5CWDgAf_tKNKdYtI7ZtZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpx78nW6aw6q_OBEgbzlBDLLqtzO1m_sKf16hJRhG3A2FkHtEA23RvFjTTKzL4c-UFU/Affordable-Ethical-Fashion-Pact',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://www.bsbfashion.com/sites/default/files/sites/default/files/custom/_K9A9227_b.jpg',
      logo:
        'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
  ];

  if (loading) {
    return null;
  }

  return (
    <Container style={styles.container} fluid>
      <View style={styles.titleContainer}>
        <Title
          title={i18n.t('storyBoard.titleStoryBoard')}
          style={styles.textTitle}
          containerStyle={{}}
          subTitle={''}
          onPress={() => {}}
        />
      </View>
      <Container fluid>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {listStoryBoads.map((item, index) => (
            <View key={item.id} style={styles.viewContainer}>
              <Item item={item} style={{flex: 1}} />
            </View>
          ))}
        </ScrollView>
      </Container>
    </Container>
  );
};

export default StoryBoard;
