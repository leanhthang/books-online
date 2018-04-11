class CreateChapters < ActiveRecord::Migration[5.1]
  def change
    create_table :chapters do |t|
      t.string :name
      t.string :origin_detail
      t.string :cstm_detail
      t.boolean :public
      t.string :image
      t.string :like
      t.string :rating
      t.string :visited
      t.string :origin_link

      t.timestamps
    end
  end
end
