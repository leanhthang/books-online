class CreateTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :types do |t|
      t.string :name, index: true
      t.string :description

      t.timestamps
    end
  end
end
