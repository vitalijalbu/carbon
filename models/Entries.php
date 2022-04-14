<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "entries".
 *
 * @property int $id
 * @property int|null $user_id
 * @property string|null $text
 * @property string|null $date_created
 */
class Entries extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'entries';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id'], 'integer'],
            [['text'], 'string'],
            [['date_created'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'text' => 'Text',
            'date_created' => 'Date Created',
        ];
    }

    /**
     * {@inheritdoc}
     * @return EntriesQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new EntriesQuery(get_called_class());
    }
}
