import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';
import isBase from '@sindresorhus/is';

import {Res} from 'src/resources/index';
import {Measurements} from 'src/utils/measurements';
import {Transition} from 'react-navigation-fluid-transitions';

const CollectionContainer = glamorous.view<{divider: boolean}>(
  {
    height: Measurements.screenHeight / 3.5,
    flex: 1,
    backgroundColor: Res.colors.secondary,
    marginBottom: Res.space.sm,
  },
  (props) => ({
    marginRight: props.divider ? 0 : Res.space.sm,
  }),
);

const ImageContainer = glamorous.view({
  flex: 3,
});

const CollectionImagePreview = glamorous.image({
  height: '100%',
  width: '100%',
});

const CollectionInfoPreview = glamorous.view({
  flex: 1,
});

const CollectionActionContainer = glamorous.view({
  flex: 1,
  paddingHorizontal: Res.space.xs,
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Title = glamorous.text({
  ...Res.textStyles.body2,
  color: Res.colors.third,
  paddingLeft: Res.space.xs,
  flex: 1,
  paddingTop: Res.space.xs,
});

const Block = glamorous.view<{favorite?: boolean}>(
  {
    flex: 1,
    flexDirection: 'row',
  },
  (props) => ({
    backgroundColor: props.favorite && props.favorite ? 'red' : 'transparent',
  }),
);

const Icon = glamorous.image({
  width: 20,
  height: 20,
  tintColor: Res.colors.third,
  marginRight: Res.space.xs,
  right: 0,
});

const InfoTitle = glamorous.text({
  ...Res.textStyles.body2,
  color: Res.colors.third,
});

const Button = glamorous.touchableOpacity({
  flex: 1,
});

interface CollectionProps {
  data: any;
  index: number;
  favorites: Number[];
  onFavorite: (id: number) => void;
  onCollectionPress: (id: number) => void;
}

const Collection: FunctionComponent<CollectionProps> = (props) => {
  const {data, index, onCollectionPress} = props;
  return (
    <Button onPress={() => onCollectionPress(data.id)}>
      <CollectionContainer divider={index % 3 === 2}>
        <ImageContainer>
          <Transition appear="flip" shared={String(data.id)}>
            <CollectionImagePreview
              source={{
                uri: !isBase.nullOrUndefined(data.image)
                  ? data.image.medium
                  : 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png',
              }}
            />
          </Transition>
        </ImageContainer>
        <CollectionInfoPreview>
          <Title>{data.name}</Title>
          <CollectionActionContainer>
            <Block>
              <Icon source={Res.images.circledStarIcon} />
              <InfoTitle>{data.rating.average}</InfoTitle>
            </Block>
            <Button onPress={() => props.onFavorite(data.id)}>
              <Block
                favorite={props.favorites && props.favorites.includes(data.id)}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  justifyContent: 'flex-end',
                }}>
                <Icon source={Res.images.circledThumbsUpIcon} />
              </Block>
            </Button>
          </CollectionActionContainer>
        </CollectionInfoPreview>
      </CollectionContainer>
    </Button>
  );
};

export default Collection;
