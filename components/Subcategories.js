import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

class Subcategories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.route.params.title,
            subcategories: this.props.route.params.subcategories,
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({ title: this.state.title });
    }

    static navigationOptions = {
        title: 'Subcategories'
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#291000',
                }}
                />
        );
    }

    render() {

        const { navigate } = this.props.navigation;

        const renderSubcategory = ({ item }) => (
            <ListItem
                key={item.id}
                title={item.name}
                containerStyle={styles.listItem}
                leftIcon={() => (<Icon name='keyboard-arrow-right' type='material' size={24} />)}
                onPress={() => navigate('HabitOptionsForm', { name: item.name })}
                underlayColor='#FFFFEB'
                activeOpacity={0.5}
                />
        )

        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.subcategories}
                    renderItem={renderSubcategory}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{paddingBottom: '0%'}}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    ListFooterComponent={this.FlatListItemSeparator}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFEB',
        flex: 1,
    },
    listItem: {
        backgroundColor: '#FFFFEB',
        padding: 10,
        margin: 5,
    }
});

export default Subcategories;
