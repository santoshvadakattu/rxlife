// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, TextInput, ActivityIndicator} from 'react-native';
import {Text} from '../';
import {Images, Colors, AppStyles} from '../../theme';
import styles from './styles';
import { fetchNutritionData } from '../../services/ninjaApi';

export default class SearchBar extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    onSearchText: PropTypes.func,
    isSearching: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: 'Search',
    onSearchText: () => {},
    isSearching: false,
  };

  state = {
    searchResults: [],
  };

  handleSearch = async (text) => {
    const { onSearchText } = this.props;
    onSearchText(text);
    try {
      const results = await fetchNutritionData(text);
      this.setState({ searchResults: results });
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    }
  };

  render() {
    const {placeholder, isSearching} = this.props;
    const {searchResults} = this.state;

    return (
      <View style={[styles.container]}>
        <View style={styles.searchWrapper}>
          <Image source={Images.Search_icon} style={styles.icon} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.black1}
            style={styles.textInput}
            returnKeyType="search"
            onChangeText={this.handleSearch}
          />
          {isSearching && (
            <ActivityIndicator
              size="small"
              color={Colors.white}
              style={AppStyles.mRight10}
            />
          )}
        </View>
        {searchResults.length > 0 && (
          <View style={styles.resultsWrapper}>
            {searchResults.map((item, index) => (
              <Text key={index} style={styles.resultItem}>
                {item.name}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  }
}