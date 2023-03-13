module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'pnu',
        {
            type: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            index: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            link: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            date: {
                type: DataTypes.STRING(45),
                allowNull: false
            }
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: false,
            tableName: 'pnu'
        }
    )
};