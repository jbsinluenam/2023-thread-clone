import * as React from 'react';
import { StyleSheet, Platform, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Lottie from 'lottie-react-native';
import { ThreadContext } from '../../context/thread-context';
import ThreadItem from '../../components/ThreadItem';

// const user = createRandomUser();

// console.log(JSON.stringify(user, null, 2));

export default function TabOneScreen() {
  const animationRef = React.useRef<Lottie>(null);
  const thread = React.useContext(ThreadContext);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          // backgroundColor: 'gray',
          paddingHorizontal: 5,
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              animationRef.current?.play();
            }}
            tintColor={'transparent'}
          />
        }>
        <Lottie
          ref={animationRef}
          source={require('../../assets/lottie/threads.json')}
          loop={false}
          autoPlay={true}
          style={{ width: 90, height: 90, alignSelf: 'center' }}
        />
        {thread.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
