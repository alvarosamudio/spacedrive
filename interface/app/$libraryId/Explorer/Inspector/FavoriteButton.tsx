import { Heart } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Object as SDObject, useLibraryMutation } from '@sd/client';
import { Button } from '@sd/ui';

interface Props {
	data: SDObject;
}

export default function FavoriteButton(props: Props) {
	const [favorite, setFavorite] = useState(false);

	useEffect(() => {
		setFavorite(!!props.data?.favorite);
	}, [props.data]);

	const updateObject = useLibraryMutation(
		'objects.update'
		// {
		// 	onError: () => setFavorite(!!props.data?.favorite)
		// }
	);

	const toggleFavorite = () => {
		updateObject.mutate([props.data.id, { favorite: !favorite }]);
		setFavorite(!favorite);
	};

	return (
		<Button disabled={updateObject.isLoading} onClick={toggleFavorite} size="icon">
			<Heart weight={favorite ? 'fill' : 'regular'} className="h-[18px] w-[18px]" />
		</Button>
	);
}
