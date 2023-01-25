import { collection } from 'firebase/firestore';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';

export default function ProfilePage() {
  const query = collection(db, 'words', 'userid2', 'games')
  const [snapshot, loading, error] = useCollectionData(query);
  console.log(snapshot)
  return <div>ProfilePage</div>;
}