import { Text, View, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '../constants';

import CustomButton from '../components/CustomButton';

export default function App() {
    return (
        <ImageBackground source={images.onboardingBg}
            style={styles.mainContainer}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.overlay}>
                <ScrollView contentContainerStyle={{ height: '100%'}}>
                    <View style={styles.onboardContainer}>
                        <View style={styles.topArea}>
                            <Image source={icons.logo}
                                style={styles.image}
                                resizeMode='contain'
                            />
                            <Text style={styles.title}><Text style={styles.upper}>S</Text>PARTA<Text style={styles.upper}>T</Text>RACK</Text>
                        </View>
                        <View style={styles.bottomArea}>
                            <Text style={styles.title}>Welcome to SpartaTrack!</Text>
                            <Text style={styles.bottomText}>Unlock Your Potential</Text>
                            <CustomButton
                                title="Get Started"
                                handlePress={() => router.push('/sign-up')}
                                containerStyles={{ width: '100%' }}
                            />
                            <View style={styles.createNew}>
                                <Text style={styles.bottomText}>Already have an account?</Text>
                                <Link style={styles.linkText}
                                    href="/sign-in">
                                    Login
                                </Link>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <StatusBar
                    style='light'
                />
            </SafeAreaView>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'rgba(65, 110, 151, 1)',
        height: '100%',
    },
    onboardContainer: {
        alignItems: 'center',
        height: '100%',
        width: '100%',
        padding: 16,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    topArea: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 100,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 44,
        color: 'white',
    },
    upper: {
        fontSize: 44,
    },
    bottomArea: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        position: 'absolute',
        bottom: 20,
        color: 'white',
    },
    bottomHeader: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
        color: 'white',
    },
    bottomText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 30,
    },
    createNew: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    linkText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textDecorationLine: 'underline',
        color: '#2D95F3',
    }
});