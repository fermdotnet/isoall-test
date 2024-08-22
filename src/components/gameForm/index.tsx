'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Categories from '@/types/categories';
import { GameFormData, GameSchema } from '@/types/form';
import { Game } from '@/types/game';
import Button from '@/components/button';
import FormField from '@/components/formField';
import FormSelect from '@/components/formSelect';
import { createGame, updateGame } from '@/app/actions/games/mutations';

type Props = {
  data?: Game;
};

const GameForm = ({ data }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError
  } = useForm<GameFormData>({
    resolver: zodResolver(GameSchema),
    defaultValues: data
  });

  const onSubmit = (formData: GameFormData) => {
    if (!isValid) {
      return;
    }

    if (data) {
      updateGame(data.id, formData).catch(err => {
        alert(err.message || 'An error occurred updating the game');
      });
    } else {
      createGame(formData).catch(err => {
        alert(err.message || 'An error occurred creating the game');
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField type="text" placeholder="Name" name="name" register={register} error={errors.name} />
      <FormSelect
        name="category"
        register={register}
        error={errors.category}
        options={Object.values(Categories).map(category => ({
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1)
        }))}
      />
      <Button type="submit" disabled={!isValid}>
        {!data ? 'Add new game' : 'Update game'}
      </Button>
    </form>
  );
};

export default GameForm;
