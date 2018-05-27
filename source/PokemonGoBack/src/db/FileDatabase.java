package db;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class FileDatabase {

    private static FileDatabase database;

    private static String databasePath = "database";
    private static Map<String, String> users;


    private FileDatabase() throws IOException {
        users = indexContext(Paths.get(databasePath, "users"));
        indexDatabase(databasePath);
    }

    public static FileDatabase GetConnection() throws IOException {
        if (database == null) {
            database = new FileDatabase();
        }
        return database;
    }

    public boolean valid(String username, String password) {
        return true;
    }

    public boolean get(String key) {
        return true;
    }

    private static Map<String, String> indexContext(Path fileName) throws IOException {
        Map<String, String> map = Collections.EMPTY_MAP;
        List<String> lines = Files.readAllLines(fileName, StandardCharsets.UTF_8);
        for (String line : lines) {
            String[] strings = line.split("\t");
            if(strings.length != 2){
                throw new IOException();
            }
            map.put(strings[0], strings[1]);
        }
        return map;
    }

    private static DirectoryStream<Path> indexFile(Path directoryName) throws IOException {
        DirectoryStream.Filter<Path> filter = (Path file) -> !Files.isDirectory(file);
        return Files.newDirectoryStream(directoryName, filter);
    }

    private static DirectoryStream<Path> indexDirectory(Path directoryName) throws IOException {
        DirectoryStream.Filter<Path> filter = (Path file) -> Files.isDirectory(file);
        return Files.newDirectoryStream(directoryName, filter);
    }

    private static Map<String, DirectoryStream<Path>> indexDatabase(String database) throws IOException {
        Map<String, DirectoryStream<Path>> map = Collections.emptyMap();
        Path databasePath = Paths.get(database);
        DirectoryStream<Path> directories = indexDirectory(databasePath);
        for (Path path : directories) {
            map.put(path.toFile().getName(), indexFile(path));
        }
        return map;
    }
}
