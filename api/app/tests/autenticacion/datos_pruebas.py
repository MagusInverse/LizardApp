datos_prueba_test_registrar_usuario_valido = [
    # username, password, email

    # testing different passwords formats, same username, email. (all should return 200)

    # 8 characters password, no upper case letters, no special characters, no numbers
    ("Spotless9454", "wgteacgo", "example@example.cl"),

    # 8 characters password, numbers, upper case letters, no special characters
    ("Spotless9454", "abcDe8r8", "example@example.cl"),

    # 8 characters password, numbers, upper case letters, special characters
    ("Spotless9454", "^ZSnH9!n", "example@example.cl"),

    # 128 characters password, no upper case letters, no special characters, no numbers
    ("Spotless9454", "umhpjfkpjwgxdyodgzdngpprdcqixzsgjztirrjamkyyxzkmqhbseppdqrokxcyrempezirhrfibawgzerbvxcrmjrzkputqcrwouorcwqwbenugyyryxejbuvlfslxz", "example@example.cl"),

    # 128 characters password, numbers, upper case letters, no special characters
    ("Spotless9454", "Ai7WPwQ73ml9cATOpbJeoh6cblUBQIkrtUGtxiZi11fikOtQYc17QhPyLEB2gac1Rb4Vz663ledHPuvgE6Gv8DHJzuDN1HbUkv8zdi78HVNOftOxXFavJio138uzX764", "example@example.cl"),

    # 128 characters password, numbers, upper case letters, special characters
    ("Spotless9454", "O@8dYs41UCK^xNBs^57bjMHEnm^cTan#fytaoCqsox%5VOfyM98XD8XAOOKu3gGFeG@xe#pKo5G#APdHWdPicJH5Vm6Gd2usM4ceyw84mnB4bJygS*FPj$iZ6HOskgFm", "example@example.cl"),
]
