import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddCreatedAtAndUpdateAt1592206406201 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users', [
            new TableColumn({name: 'createdAt', type: 'time', isNullable: false, default: 'now()'}),
            new TableColumn({name: 'updateAt', type: 'time', isNullable: false, default: 'now()'})
        ]);
        await queryRunner.addColumns('posts', [
            new TableColumn({name: 'createdAt', type: 'time', isNullable: false, default: 'now()'}),
            new TableColumn({name: 'updateAt', type: 'time', isNullable: false, default: 'now()'})
        ]);
        await queryRunner.addColumns('comments', [
            new TableColumn({name: 'createdAt', type: 'time', isNullable: false, default: 'now()'}),
            new TableColumn({name: 'updateAt', type: 'time', isNullable: false, default: 'now()'})
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.dropColumn('users', 'createdAt');
            await queryRunner.dropColumn('users', 'updateAt');
            await queryRunner.dropColumn('posts', 'createdAt');
            await queryRunner.dropColumn('posts', 'updateAt');
            await queryRunner.dropColumn('comments', 'createdAt');
            await queryRunner.dropColumn('comments', 'updateAt');
        }
        catch (error) {

        }
    }

}
