/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeView} from 'components';

import Stories from './Stories';

const StoryBoard = ({navigation}) => {
  const insets = useSafeAreaInsets();
  console.log(insets);
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
  return (
    <ThemeView isFullView>
      <Stories stories={listStoryBoads} />
    </ThemeView>
  );
};

StoryBoard.defaultProps = {};

StoryBoard.propTypes = {};

export default StoryBoard;
