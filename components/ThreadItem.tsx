import { Thread } from '../types/threads';
import { Text } from './Themed';
import { View, useColorScheme, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import {
  Ionicons,
  Feather,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';
import { timeAgo } from '../utils/timeAgo';

interface ThreadItemProps {
  thread: Thread;
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function ThreadItem({ thread }: ThreadItemProps): JSX.Element {
  return (
    <View style={styles.container}>
      <PostLeftSide {...thread} />
      <View style={{ gap: 6, flexShrink: 1 }}>
        <PostHeading
          name={thread.author.name}
          createdAt={thread.createdAt}
          verified={thread.author.verified}
        />
        <Text>{thread.content}</Text>
        {thread.image && (
          <Image
            source={thread.image}
            style={{ width: '100%', height: 300, borderRadius: 15 }}
            placeholder={blurhash}
            contentFit='cover'
            transition={200}
          />
        )}
        <PostFooter replies={thread.repliesCount} likes={thread.likesCount} />
        <BottomIcon />
      </View>
    </View>
  );
}

function PostHeading({
  name,
  createdAt,
  verified,
}: {
  name: string;
  createdAt: string;
  verified: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 1,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontWeight: '500' }}>{name}</Text>
        {verified && (
          <MaterialIcons name='verified' size={14} color='#60a5fa' />
        )}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Text style={{ color: 'grey' }}>{timeAgo(createdAt)}</Text>
        <Feather name='more-horizontal' size={14} color='grey' />
      </View>
    </View>
  );
}

function PostFooter({ replies, likes }: { replies: number; likes: number }) {
  return (
    <Text style={{ color: 'gray' }}>
      {replies} replies • {likes} likes
    </Text>
  );
}

function BottomIcon() {
  const size = 20;
  const currentTheme = useColorScheme();
  const color = currentTheme === 'light' ? 'black' : 'white';

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <FontAwesome name='heart-o' size={size} color={color} />
      <Ionicons name='chatbubble-outline' size={size} color={color} />
      <AntDesign name='retweet' size={size} color={color} />
      <Feather name='send' size={size} color={color} />
    </View>
  );
}

function PostLeftSide(thread: Thread) {
  const currentTheme = useColorScheme();
  const borderColor = currentTheme === 'light' ? '#00000020' : '#ffffff20';

  return (
    <View style={{ justifyContent: 'space-between' }}>
      <Image
        source={thread.author.photo}
        style={styles.image}
        placeholder={blurhash}
        contentFit='cover'
        transition={500}
      />
      <View
        style={{
          borderWidth: 1,
          alignSelf: 'center',
          borderColor: borderColor,
          flexGrow: 1,
        }}
      />
      <View
        style={{
          width: 20,
          alignItems: 'center',
          alignSelf: 'center',
          gap: 3,
        }}>
        {[1, 2, 3].map((index) => (
          <Image
            key={index}
            // @ts-ignore
            source={thread.replies[index - 1]?.author.photo}
            style={{ width: index * 7, height: index * 7, borderRadius: 15 }}
            placeholder={blurhash}
            contentFit='cover'
            transition={500}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 30,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
