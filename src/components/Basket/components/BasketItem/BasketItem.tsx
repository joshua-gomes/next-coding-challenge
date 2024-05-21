interface BasketItemProps {
  name: string;
  count: number;
}

const BasketItem = ({ name, count }: BasketItemProps) => {
  return (
    <div>
      <p>{name}</p>
      <p>count: {count}</p>
    </div>
  );
};

export default BasketItem;
