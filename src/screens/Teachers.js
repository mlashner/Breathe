import React from 'react';
import {StyleSheet, View, FlatList } from 'react-native';
import TeacherCard from '../components/TeacherCard';
import SearchBar from '../components/SearchBar';

export default class TeachersScreen extends React.Component {
    static navigationOptions = {
        title: 'TEACHERS',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: props.route.params.teachers ?? [],
            user: props.route.params.user ?? {},
            searchQuery: '',
        }
        this.clearSearch = this.clearSearch.bind(this);
      }

    handleSearch = (text) => {
        this.setState({ searchQuery: text })

    }

    clearSearch() {
        this.setState({ searchQuery: '' })

    }

    getFilteredData() {
        const { data, searchQuery } = this.state;

        const sortedData = data.sort((prev, next) => prev.fullName.localeCompare(next.fullName))

        if (!searchQuery) {
            return sortedData;
        }

        return sortedData.filter(item => item.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    _renderItem = ({item}) => {
        return (
            <View style={styles.list}>
                <TeacherCard item={item} navigation={this.props.navigation} user={this.state.user}/>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar 
                    searchQuery={this.state.searchQuery} 
                    handleSearch={this.handleSearch} 
                    clearSearch={this.clearSearch}
                />
                <FlatList 
                    style={styles.flastList}
                    contentInset={{bottom: 60}}
                    contentContainerStyle={styles.flatList}
                    data={this.getFilteredData()}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                    renderItem={(item) => this._renderItem(item)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgb(220, 230, 232)',
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        flex: 1,
    },
    flastList: {
        flex: 1,
        width: '100%'
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});